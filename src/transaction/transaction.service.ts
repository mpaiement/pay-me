import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transaction.entity';


@Injectable()
export class TransactionService {
  @InjectRepository(Transaction)
  private readonly transactionRepository: Repository<Transaction>



  async saveTransaction(idMarchand: string, amount: number){

    try{
     const transaction = new Transaction();
    //  transaction.idMarchand = idMarchand;
     transaction.amount = amount;
     const saveTransaction : await this.transactionRepository.save(transaction);
     
     
       return saveTransaction;
     }
    catch (error) {
   
     return Error('Failed to save transaction.');
     
     }
    }

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
