import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/entities/card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    
  ) {}
  getCard(): string {
    return 'la route de card';
  }
  async createCard(data: CreateCardDto) {
    const result = await this.cardRepository.save(data);
    return result;
  }
  deleteCard(): string {
    return ' la card est supprimee ';
  }
  upDateCard(): string {
    return 'la route de la card';
  }
}
