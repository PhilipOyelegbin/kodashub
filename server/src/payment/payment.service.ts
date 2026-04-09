import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Domain } from 'src/domain/entities/domain.entity';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Cart) private readonly cartRepo: Repository<Cart>, @InjectRepository(Domain) private readonly domainRepo: Repository<Domain>) { }

  async create(dto: CreatePaymentDto) {
    try {
      const cartItem = await this.cartRepo.findOne({
        where: { id: dto.cartId },
        relations: ['user'],
      });
      if (!cartItem) {
        throw new NotFoundException('Cart not found');
      }

      const response = await fetch(
        'https://api.paystack.co/transaction/initialize',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: cartItem.user.email,
            amount: cartItem.product.price * 100,
            reference: `${cartItem.id}-${Date.now()}`,
            currency: 'NGN',
            channels: [dto.method.toLowerCase()],
            callback_url: process.env.PAYSTACK_CALLBACK_URL,
            metadata: {
              orderId: cartItem.id,
              userId: cartItem.user.id,
              cancel_action: process.env.CLIENT_URL,
            },
          }),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new InternalServerErrorException('Failed to initialize payment');
      }

      const newOrder = this.domainRepo.create({
        name: cartItem.product.name,
        registrationPeriod: cartItem.product.regPeriod,
        registrationPrice: cartItem.product.price,
        transactionRef: result.data.reference,
        checkOutUrl: result.data.authorization_url,
        user: cartItem.user,
      });
      await Promise.all([
        this.domainRepo.save(newOrder),
        this.cartRepo.remove(cartItem),
      ]);
      return {
        message: 'Payment initialized successfully',
        data: result.data,
      };
    } catch (error) {
      throw error
    }
  }

  // async findAll() {
  //   const payments = await this.paymentRepo.find({
  //     relations: ['user', 'order'],
  //   });
  //   return { message: 'Payments fetched successfully', data: payments };
  // }

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
      throw new InternalServerErrorException('Failed to list payment');
    }

    return result;
  }

  async confirmPayment(order_id: string) {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${order_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();
    if (!response.ok) {
      throw new InternalServerErrorException('Failed to verify payment');
    }

    return result;
  }

  async processWebhookEvent(payload: any) {
    const transactionRef = payload.data.reference;
    const existingOrder = await this.domainRepo.findOne({
      where: { transactionRef },
    });
    if (!existingOrder) {
      throw new NotFoundException('Payment not found');
    }

    const successfulPayment = this.domainRepo.create({
      ...existingOrder,
      status: 'active',
    });

    const failedPayment = this.domainRepo.create({
      ...existingOrder,
      status: 'failed',
    });

    switch (payload.event) {
      case 'charge.success':
        await this.domainRepo.save(successfulPayment);
        break;
      case 'transfer.success':
        await this.domainRepo.save(successfulPayment);
        break;
      case 'paymentrequest.success':
        await this.domainRepo.save(successfulPayment);
        break;
      case 'transfer.failed':
        await this.domainRepo.save(failedPayment);
        break;
      case 'transfer.reversed':
        await this.domainRepo.save(failedPayment);
        break;
      default:
        console.log(`Unhandled event type: ${payload.event}`);
    }
  }
}
