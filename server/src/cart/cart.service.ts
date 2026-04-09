import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) { }

  async create(dto: CreateCartDto, userId: string) {
    if (!userId) throw new BadRequestException('User id is required');

    const newCart = this.cartRepo.create({
      ...dto,
      user: { id: userId },
      product: { name: dto.name, price: dto.price * dto.regPeriod, regPeriod: dto.regPeriod, nameservers: dto.nameservers || [] },
    });
    const result = await this.cartRepo.save(newCart);
    return { message: 'Cart created successfully', result };
  }

  async findAll(userId: string) {
    if (!userId) throw new BadRequestException('User id is required');

    const result = await this.cartRepo.find({
      where: { user: { id: userId } },
    });
    return {
      message: 'Carts fetched successfully',
      result
    };
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException('Cart id is required');

    const existingCart = await this.cartRepo.findOne({
      where: { id },
    });
    if (!existingCart) {
      throw new NotFoundException('Cart not found');
    }

    return { message: 'Cart fetched successfully', result: existingCart };
  }

  async update(id: string, userId: string, dto: UpdateCartDto) {
    if (!id) throw new BadRequestException('Cart id is required');
    if (!userId) throw new BadRequestException('User id is required');

    const existingCart = await this.cartRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!existingCart) {
      throw new NotFoundException('Cart not found');
    }

    // Derive the unit price dynamically based on existing data if a new price is not provided
    const basePrice = dto.price ?? (existingCart.product.price / existingCart.product.regPeriod);

    // Safely construct the updated product JSON
    existingCart.product = {
      ...existingCart.product,
      name: dto.name ?? existingCart.product.name,
      regPeriod: dto.regPeriod ?? existingCart.product.regPeriod,
      nameservers: dto.nameservers ?? existingCart.product.nameservers,
      price: basePrice * (dto.regPeriod ?? existingCart.product.regPeriod),
    };

    const result = await this.cartRepo.save(existingCart);
    return { message: 'Cart updated successfully', result };
  }

  async remove(id: string, userId: string) {
    if (!id) throw new BadRequestException('Cart id is required');
    if (!userId) throw new BadRequestException('User id is required');

    const existingCart = await this.cartRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!existingCart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartRepo.remove(existingCart);
    return { message: 'Cart deleted successfully' };
  }
}
