import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getCard(): string {
    return this.cardService.getCard();
  }
  @Post('create')
  createCard(@Body() data: CreateCardDto) {
    return this.cardService.createCard(data);
  }
  @Delete()
  deleteCard(): string {
    return this.cardService.deleteCard();
  }
  @Put()
  upDateCard(): string {
    return this.cardService.upDateCard();
  }
}
