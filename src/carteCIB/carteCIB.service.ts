import { Injectable } from '@nestjs/common';

@Injectable()
export class CarteCIBService {
  getCarteCIB(): string {
    return 'la route de CarteCIB';
  }
  createCarteCIB(): string {
    return 'la route de la carteCIB';

  }
  deleteCarteCIB(): string {
    return ' la carteCIB est supprimee ';
  }
  upDateCarteCIB(): string {
    return 'la route de la carteCIB';
  }

}