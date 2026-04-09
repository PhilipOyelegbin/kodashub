import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Domain } from 'src/domain/entities/domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Domain])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
