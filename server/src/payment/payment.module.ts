import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { Domain } from '../domain/entities/domain.entity';
import { DomainService } from '../domain/domain.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Domain, User])],
  controllers: [PaymentController],
  providers: [PaymentService, DomainService],
})
export class PaymentModule { }
