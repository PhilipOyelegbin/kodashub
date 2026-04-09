import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req, Res, HttpStatus, RawBodyRequest } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { createHmac } from 'crypto';

@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @ApiOperation({
    summary: 'Create a new payment',
    description: 'Initialize a payment transaction for a cart item',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Created' })
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreatePaymentDto) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Unauthorized user');
    }
    return this.paymentService.create(dto);
  }

  // @ApiOperation({
  //   summary: 'Get all payments',
  //   description: 'Retrieve a list of all payments (admin only)',
  // })
  // @ApiBearerAuth()
  // @ApiOkResponse({ description: 'OK' })
  // @UseGuards(JwtGuard)
  // @Get()
  // findAll(@Req() req: any) {
  //   if (!req.user || !req.user.is_admin) {
  //     this.logger.warn(
  //       `User ${req.user.id} is not allowed to access all payments`,
  //     );
  //     throw new ForbiddenException(
  //       'User is not allowed to access this resource',
  //     );
  //   }

  //   return this.paymentsService.findAll();
  // }

  // @ApiOperation({
  //   summary: 'List all transactions',
  //   description: 'List all transactions (admin only)',
  // })
  // @ApiBearerAuth()
  // @ApiOkResponse({ description: 'OK' })
  // @UseGuards(JwtGuard)
  // @Get('list/:page/:perPage')
  // listTransactions(
  //   @Req() req: any,
  //   @Param('page') page: number,
  //   @Param('perPage') perPage: number,
  // ) {
  //   if (!req.user || !req.user.is_admin) {
  //     this.logger.warn(
  //       `User ${req.user.id} is not allowed to list transactions`,
  //     );
  //     throw new ForbiddenException(
  //       'User is not allowed to access this resource',
  //     );
  //   }

  //   return this.paymentsService.listTransactions(perPage, page);
  // }

  // @ApiOperation({
  //   summary: 'Confirm a payment',
  //   description: 'Confirm the status of a payment by its order ID (admin only)',
  // })
  // @ApiBearerAuth()
  // @ApiOkResponse({ description: 'OK' })
  // @UseGuards(JwtGuard)
  // @Get('verify/:order_id')
  // confirmPayment(@Req() req: any, @Param('order_id') order_id: string) {
  //   if (!req.user || !req.user.is_admin) {
  //     this.logger.warn(`User ${req.user.id} is not allowed to confirm payment`);
  //     throw new ForbiddenException(
  //       'User is not allowed to access this resource',
  //     );
  //   }
  //   if (!order_id) {
  //     this.logger.warn(`Order ID is required to confirm payment`);
  //     throw new BadRequestException('Order ID is required');
  //   }

  //   return this.paymentsService.confirmPayment(order_id);
  // }

  @ApiOperation({
    summary: 'Handle Paystack webhook events',
    description: 'Process incoming webhook events from Paystack',
  })
  @ApiOkResponse({ description: 'OK' })
  @Post('webhook')
  async webhookHandler(@Req() req: RawBodyRequest<Request>, @Res() res: any) {
    const secret = process.env.PAYSTACK_SECRET_KEY ?? '';
    // Use the raw body buffer for HMAC to match Paystack's exact byte sequence
    const rawBody = req.rawBody ?? Buffer.from(JSON.stringify(req.body));
    const hash = createHmac('sha512', secret)
      .update(rawBody)
      .digest('hex');

    if (hash === (req.headers as any)['x-paystack-signature']) {
      const event = req.body;
      await this.paymentService.processWebhookEvent(event);
    }

    res.status(HttpStatus.OK).send({ message: 'Webhook received' });
  }
}
