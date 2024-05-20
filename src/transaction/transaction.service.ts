import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { CreateTransactionDto } from './transaction.dto';
import { User } from 'src/entities/user.entity';
import { Marchand } from 'src/entities/marchand.entity';
import { CreateTransactionMoneyDto } from './transactionmoney.dto';
import { QrCode } from 'src/entities/qrCode.entity';
import { Card } from 'src/entities/card.entity';
import { Account } from 'src/entities/account.entity';
import { join } from 'path';

@Injectable()
export class TransactionService {
  @InjectRepository(Transaction)
  private readonly transactionRepository: Repository<Transaction>;
  @InjectRepository(User)
  private usersRepository: Repository<User>;
  // @InjectRepository(Marchand)
  // private marchandRepository: Repository<Marchand>;

  // @InjectRepository(QrCode)
  // private qrCodeRepository: Repository<QrCode>;

  // @InjectRepository(Card)
  // private cardRepository: Repository<Card>;

  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  async saveTransaction(data: CreateTransactionDto) {
    try {
      const saveTransaction = await this.transactionRepository.save(data);
      return saveTransaction;
    } catch (error) {
      return Error('Failed to save transaction.');
    }
  }

  async transferMoney(data: CreateTransactionMoneyDto) {
    const { idUser, amount, idMarchand } = data;

    const userAmount = await this.usersRepository.query(`
      Select amount FROM card
      INNER JOIN account ON account.idAccount = card.idAccount
      INNER JOIN user ON user.idCard = card.idCard
      where idUser = '${idUser}'
    `);
    const amountResult = userAmount[0].amount;

    if (amountResult < Number(amount)) {
      throw new ForbiddenException(
        'solde issufissant impossible deffectuer le paiement ',
      );
    }

    const userEnvoi = await this.accountRepository.query(`
     update account 
      INNER JOIN card ON account.idAccount = card.idAccount
      INNER JOIN user ON user.idCard = card.idCard
      set amount = (amount - ${amount})
      where idUser = '${idUser}'
    `);
    const marchandRecevoir = await this.accountRepository.query(`
      update account 

      INNER JOIN card ON account.idAccount = card.idAccount
      INNER JOIN marchand ON marchand.idCard = card.idCard
      set amount = (amount + ${amount})
      where idMarchand = '${idMarchand}'
    `);

    console.log('🚀 ~ TransactionService ~ transferMoney ~ amount:', amount);
    console.log(
      '🚀 ~ TransactionService ~ transferMoney ~ userAmount:',
      userAmount.amount,
    );
    return { userEnvoi, marchandRecevoir };
  }

  async getHistorique(idUser: string) {
    const historique = await this.usersRepository.query(`
    select * from transaction
    INNER JOIN user ON user.idUser = transaction.idUser
    where transaction.idUser = '${idUser}'
    `);
    return historique;
  }

  deleteTransaction() {
    return ' la transaction est supprimé';
  }
  upDateTransaction() {
    return 'modification de la transaction';
  }
}
