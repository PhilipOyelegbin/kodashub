import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { Payment } from './entities/payment.entity';
import { PaymentEvent } from './entities/payment-event.entity';
import { FulfillmentHandlerRegistry } from './registry/fulfillment-handler.registry';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(PaymentEvent)
    private readonly paymentEventRepo: Repository<PaymentEvent>,
    private fulfillmentRegistry: FulfillmentHandlerRegistry,
    private dataSource: DataSource,
  ) {}

  /**
   * Initialize a payment transaction with idempotency safeguards.
   * - Generates idempotency key from cartId + userId + timestamp
   * - Checks if a pending payment already exists (retry case)
   * - Creates payment record in "pending" state
   * - Reserves the cart (marks it as linked to payment, not deleted)
   * - Requests authorization URL from Paystack
   */
  async initializePayment(dto: CreatePaymentDto, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cartItem = await queryRunner.manager.findOne(Cart, {
        where: { id: dto.cartId },
        relations: ['user'],
      });

      if (!cartItem) {
        throw new NotFoundException('Cart not found');
      }

      if (cartItem.user.id !== userId) {
        throw new BadRequestException('Cart does not belong to this user');
      }

      // Generate stable idempotency key
      const idempotencyKey =
        dto.idempotencyKey || `${dto.cartId}-${userId}-${Date.now()}`;

      // Check if payment already exists (idempotency: retry case)
      let existingPayment = await queryRunner.manager.findOne(Payment, {
        where: { idempotencyKey },
      });

      if (existingPayment && existingPayment.status === 'pending') {
        this.logger.log(
          `Payment already initiated with key ${idempotencyKey}, returning existing authorization URL`,
        );
        await queryRunner.rollbackTransaction();
        return {
          message: 'Payment already initialized',
          data: {
            reference: existingPayment.transactionRef,
            authorization_url: existingPayment.authorizationUrl,
          },
          isRetry: true,
        };
      }

      // Call Paystack to get authorization URL
      const paystackResponse = await this.initializePaystackTransaction(
        cartItem.user.email,
        cartItem.price,
        idempotencyKey,
        cartItem.id,
        userId,
        dto.method,
      );

      // Create payment record in transaction
      const newPayment = queryRunner.manager.create(Payment, {
        idempotencyKey,
        amount: cartItem.price * 100, // Convert to cents
        currency: 'NGN',
        serviceType: cartItem.serviceType, // Track which service is being paid for
        status: 'pending',
        transactionRef: paystackResponse.data.reference,
        authorizationUrl: paystackResponse.data.authorization_url,
        paystackResponse: JSON.stringify(paystackResponse.data),
        metadata: cartItem.metadata, // Store service-specific data for fulfillment
        cart: cartItem,
        user: cartItem.user,
      });

      await queryRunner.manager.save(newPayment);

      // Mark cart as reserved (don't delete it yet)
      cartItem.updatedAt = new Date();
      await queryRunner.manager.save(cartItem);

      await queryRunner.commitTransaction();

      this.logger.log(
        `Payment initialized: ${newPayment.id} for user ${userId}`,
      );

      return {
        message: 'Payment initialized successfully',
        data: paystackResponse.data,
        paymentId: newPayment.id,
      };
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(
        `Payment initialization failed: ${err.message}`,
        err.stack,
      );
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Private helper: Initialize transaction with Paystack API.
   */
  private async initializePaystackTransaction(
    email: string,
    amount: number,
    idempotencyKey: string,
    cartId: string,
    userId: string,
    method: string,
  ) {
    const response = await fetch(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey, // Paystack also uses idempotency keys
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // Paystack expects amount in cents
          reference: `${cartId}-${Date.now()}`,
          currency: 'NGN',
          channels: [method.toLowerCase()],
          callback_url: process.env.PAYSTACK_CALLBACK_URL,
          metadata: {
            cartId,
            userId,
            idempotencyKey,
          },
        }),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      this.logger.error(
        `Paystack initialization failed: ${JSON.stringify(result)}`,
      );
      throw new InternalServerErrorException(
        'Failed to initialize payment with provider',
      );
    }

    return result;
  }

  /**
   * List all transactions (admin).
   */
  async listTransactions(perPage: number, page: number) {
    const response = await fetch(
      `https://api.paystack.co/transaction?page=${page}&perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();
    if (!response.ok) {
      throw new InternalServerErrorException('Failed to list transactions');
    }

    return result;
  }

  /**
   * Verify payment status with Paystack and update payment record.
   * Called both by webhook and by manual verification endpoint.
   */
  async verifyPayment(transactionRef: string) {
    // Check if payment exists
    const payment = await this.paymentRepo.findOne({
      where: { transactionRef },
      relations: ['cart', 'user'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Verify with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${transactionRef}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();
    if (!response.ok) {
      throw new InternalServerErrorException(
        'Failed to verify payment with provider',
      );
    }

    // Update payment status based on Paystack response
    if (result.data.status === 'success') {
      payment.status = 'paid';
      payment.paidAt = new Date();
      await this.paymentRepo.save(payment);

      this.logger.log(`Payment verified and marked as paid: ${payment.id}`);

      // Trigger fulfillment using appropriate service handler
      return await this.fulfillService(payment);
    } else {
      payment.status = 'failed';
      payment.failedAt = new Date();
      payment.failureReason =
        result.data.gateway_response || 'Payment verification failed';
      await this.paymentRepo.save(payment);

      this.logger.warn(
        `Payment failed: ${payment.id} - ${payment.failureReason}`,
      );

      return {
        message: 'Payment verification failed',
        status: 'failed',
        reason: payment.failureReason,
      };
    }
  }

  /**
   * Process incoming webhook events from Paystack.
   * Implements idempotency by:
   * 1. Recording the event in PaymentEvent table with Paystack's event ID
   * 2. Checking if event was already processed
   * 3. Only processing once, returning 200 for retries
   */
  async processWebhookEvent(payload: unknown) {
    const p = (payload ?? {}) as Record<string, any>;
    const paystackEventId = p.id as string | undefined;
    const transactionRef = (p.data && p.data.reference) as string | undefined;
    const eventType = p.event as string | undefined;

    this.logger.log(
      `Webhook received: event=${eventType}, txn=${transactionRef}, paystackEventId=${paystackEventId}`,
    );

    // Check if this event was already processed (idempotency guard)
    const existingEvent = await this.paymentEventRepo.findOne({
      where: { paystackEventId },
    });

    if (existingEvent) {
      if (existingEvent.processingStatus === 'success') {
        this.logger.log(
          `Event already processed successfully: ${paystackEventId}`,
        );
        return { message: 'Event already processed', isRetry: true };
      } else if (existingEvent.processingStatus === 'processing') {
        this.logger.warn(`Event still processing: ${paystackEventId}`);
        return { message: 'Event is still being processed' };
      }
      // If failed, attempt to reprocess
    }

    // Create event record to mark as processing
    let paymentEvent =
      existingEvent ||
      this.paymentEventRepo.create({
        paystackEventId,
        transactionRef,
        eventType,
        payload: p,
        processingStatus: 'processing',
      });

    await this.paymentEventRepo.save(paymentEvent);

    // Validate required fields
    if (!transactionRef) {
      paymentEvent.processingStatus = 'failed';
      paymentEvent.processingError = 'Missing transaction reference in payload';
      paymentEvent.processedAt = new Date();
      await this.paymentEventRepo.save(paymentEvent);

      this.logger.warn(
        `Webhook missing transaction reference: event=${paystackEventId}`,
      );
      return { message: 'Missing transaction reference', ok: false };
    }

    try {
      // Process the event
      await this.handlePaymentEvent(eventType!, payload, transactionRef!);

      // Mark event as successfully processed
      paymentEvent.processingStatus = 'success';
      paymentEvent.processedAt = new Date();
      await this.paymentEventRepo.save(paymentEvent);

      this.logger.log(`Event processed successfully: ${paystackEventId}`);

      return { message: 'Webhook processed' };
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      // Mark event as failed but don't throw (webhook endpoint still returns 200)
      paymentEvent.processingStatus = 'failed';
      paymentEvent.processingError = err.message;
      paymentEvent.processedAt = new Date();
      await this.paymentEventRepo.save(paymentEvent);

      this.logger.error(
        `Event processing failed: ${paystackEventId} - ${err.message}`,
        err.stack,
      );

      // Return 200 to acknowledge receipt, but the event is marked as needing retry
      return {
        message: 'Webhook received (processing error, will retry)',
        error: err.message,
      };
    }
  }

  /**
   * Handle specific Paystack event types.
   */
  private async handlePaymentEvent(
    eventType: string,
    payload: unknown,
    transactionRef: string,
  ) {
    const payment = await this.paymentRepo.findOne({
      where: { transactionRef },
      relations: ['cart', 'user'],
    });

    if (!payment) {
      throw new NotFoundException(
        `Payment not found for transaction ${transactionRef}`,
      );
    }

    switch (eventType) {
      case 'charge.success':
      case 'transfer.success':
      case 'paymentrequest.success':
        // Verify once more before marking as paid (defense in depth)
        await this.verifyPayment(transactionRef);
        break;

      case 'transfer.failed':
      case 'transfer.reversed':
      case 'charge.failed':
        payment.status = 'failed';
        payment.failedAt = new Date();
        payment.failureReason = `Event: ${eventType}`;
        await this.paymentRepo.save(payment);
        this.logger.warn(
          `Payment marked as failed due to ${eventType}: ${payment.id}`,
        );
        break;

      default:
        this.logger.warn(`Unhandled Paystack event type: ${eventType}`);
        throw new BadRequestException(`Unhandled event type: ${eventType}`);
    }
  }

  /**
   * Fulfill a payment by registering the domain.
   * Called after payment is confirmed.
   * If domain registration fails, payment stays in "paid" state and can be retried.
   */
  /**
   * Fulfill a payment using appropriate service handler
   * - Dispatches to service-specific fulfillment handler
   * - Updates payment status on success/failure
   * - Handles errors gracefully (keeps payment in "paid" state if fulfillment fails)
   */
  private async fulfillService(payment: Payment) {
    // Ensure cart is loaded
    if (!payment.cart) {
      payment.cart =
        (await this.cartRepo.findOne({
          where: { id: (payment.cart as any)?.id },
        })) || undefined;
    }

    if (!payment.cart) {
      throw new NotFoundException('Cart not found for payment fulfillment');
    }

    // Prevent double-fulfillment: re-load fresh payment state and short-circuit
    const fresh = await this.paymentRepo.findOne({ where: { id: payment.id } });
    if (!fresh) {
      throw new NotFoundException('Payment record not found');
    }

    if (fresh.status === 'fulfilled' || fresh.fulfilledAt) {
      this.logger.log(`Payment ${payment.id} already fulfilled, skipping`);
      return { message: 'Payment already fulfilled', isRetry: true };
    }

    if (fresh.status !== 'paid' && fresh.status !== 'fulfilling') {
      throw new BadRequestException(
        `Cannot fulfill payment with status ${fresh.status}`,
      );
    }

    // Mark as 'fulfilling' to signal in-progress fulfillment and reduce races
    fresh.status = 'fulfilling';
    await this.paymentRepo.save(fresh);

    // Get the appropriate fulfillment handler for this service type
    const handler = this.fulfillmentRegistry.getHandler(payment.serviceType);

    try {
      this.logger.log(
        `Fulfilling ${payment.serviceType} for payment ${payment.id}`,
      );

      // Use metadata from payment if available, otherwise use cart metadata
      const fulfillmentData =
        fresh.metadata || payment.metadata || payment.cart.metadata;
      const fulfillmentResult = await handler.fulfill(
        fulfillmentData,
        payment.user.id,
      );

      // Mark payment as fulfilled
      fresh.status = 'fulfilled';
      fresh.fulfilledAt = new Date();
      await this.paymentRepo.save(fresh);

      // Delete cart only after successful fulfillment
      try {
        if (payment.cart) await this.cartRepo.remove(payment.cart);
      } catch (removeErr) {
        this.logger.warn(
          `Failed to remove cart for payment ${payment.id}: ${String(removeErr)}`,
        );
      }

      this.logger.log(
        `${payment.serviceType} fulfilled and payment completed: ${payment.id}`,
      );

      return {
        message: 'Payment fulfilled successfully',
        service: payment.serviceType,
        result: fulfillmentResult,
      };
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));

      // Attempt to handle failure via service handler
      try {
        if (handler.handleFailure) {
          await handler.handleFailure(
            fresh.metadata || payment.metadata || payment.cart.metadata,
            payment.user.id,
            err.message,
          );
        }
      } catch (handlerError: unknown) {
        const he =
          handlerError instanceof Error
            ? handlerError
            : new Error(String(handlerError));
        this.logger.error(
          `Error in failure handler for ${payment.serviceType}: ${he.message}`,
        );
      }

      // revert to 'paid' so manual retry is possible
      try {
        fresh.status = 'paid';
        await this.paymentRepo.save(fresh);
      } catch (saveErr) {
        this.logger.warn(
          `Failed to revert payment ${payment.id} to paid: ${String(saveErr)}`,
        );
      }

      this.logger.error(
        `${payment.serviceType} fulfillment failed for payment ${payment.id}: ${err.message}`,
        err.stack,
      );

      return {
        message: `Payment confirmed but ${payment.serviceType} fulfillment failed`,
        service: payment.serviceType,
        paymentStatus: 'paid',
        fulfillmentError: err.message,
        note: 'This payment is in "paid" state and requires manual retry or support intervention',
      };
    }
  }

  /**
   * Confirm payment status (manual verification endpoint for admins).
   */
  async confirmPayment(transactionRef: string) {
    return await this.verifyPayment(transactionRef);
  }
}
