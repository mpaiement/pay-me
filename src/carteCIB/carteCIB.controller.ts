import { Controller , Get, Post, Delete, Put } from '@nestjs/common';
import { CarteCIBService } from './carteCIB.service';

@Controller('carteCIB')
export class CarteCIBController {
  constructor(private readonly carteCIBService: CarteCIBService) {}

  @Get()
  getCarteCIB(): string {
    return this.carteCIBService.getCarteCIB()
  }
  @Post()
  createCarteCIB(): string {
    return this.carteCIBService.createCarteCIB()
  }
  @Delete()
  deleteCarteCIB(): string {
    return this.carteCIBService.deleteCarteCIB()
  }
  @Put()
  upDateCarteCIB(): string {
    return this.carteCIBService.upDateCarteCIB()
  }
}