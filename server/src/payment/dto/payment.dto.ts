import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 'card',
    description:
      'The payment method must be either card, bank_transfer, apple_pay, ussd, or qr',
  })
  @IsNotEmpty()
  @IsEnum(['card', 'bank_transfer', 'apple_pay', 'ussd', 'qr'])
  method: 'card' | 'bank_transfer' | 'apple_pay' | 'ussd' | 'qr';

  @ApiProperty({
    example: 'ae028d5b-0b72-4b81-89f4-ccfb8801acd4',
    description: 'The cart ID',
  })
  @IsNotEmpty()
  @IsString()
  cartId: string;

  @ApiProperty({
    example: 'ae028d5b-0b72-4b81-89f4-ccfb8801acd4-1234567890',
    description: 'Idempotency key for retry safety (generated if not provided)',
  })
  @IsOptional()
  @IsString()
  idempotencyKey?: string;
}

export class VerifyPaymentDto {
  @ApiProperty({
    example: 'pay_xyz123',
    description: 'Paystack transaction reference to verify',
  })
  @IsNotEmpty()
  @IsString()
  transactionRef: string;
}
