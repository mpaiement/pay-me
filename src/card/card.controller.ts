import { Controller , Get, Post, Delete, Put } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getCard(): string {
    return this.cardService.getCard()
  }
  @Post()
  createCard(): string {
    return this.cardService.createCard()
  }
  @Delete()
  deleteCard(): string {
    return this.cardService.deleteCard()
  }
  @Put()
  upDateCard(): string {
    return this.cardService.upDateCard()
  }
}