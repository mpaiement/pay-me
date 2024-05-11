import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { CreateTransactionDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  @InjectRepository(Transaction)
  private readonly transactionRepository: Repository<Transaction>;

  async saveTransaction(data: CreateTransactionDto) {
    try {
      const saveTransaction = await this.transactionRepository.save(data);
      return saveTransaction;
    } catch (error) {
      return Error('Failed to save transaction.');
    }
  }

  getTransaction() {
    return 'Route de la transaction';
  }
  // createTransaction() {
  //   return 'nom de la transaction';
  // }
  deleteTransaction() {
    return ' la transaction est supprimé';
  }
  upDateTransaction() {
    return 'modification de la transaction';
  }
}
