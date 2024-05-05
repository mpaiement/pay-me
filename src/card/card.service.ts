import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  getCard(): string {
    return 'la route de card';
  }
  createCard(): string {
    return 'la route de la card';

  }
  deleteCard(): string {
    return ' la card est supprimee ';
  }
  upDateCard(): string {
    return 'la route de la card';
  }

}