import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  getAccount(): string {
    return 'nom de Account';
  }
  createAccount(): string {
    return 'nom de Account';

  }
  deleteAccount(): string {
    return ' le Account est supprimee ';
  }
  upDateAccount(): string {
    return 'nom de account';
  }
}