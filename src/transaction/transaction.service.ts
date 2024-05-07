import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  getTransaction() {
    return 'Route de la transaction';
  }
  createTransaction() {
    return 'nom de la transaction';
  }
  deleteTransaction() {
    return ' la transaction est supprimé';
  }
  upDateTransaction() {
    return 'modification de la transaction';
  }
}
