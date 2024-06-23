import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { CreateTransactionDto } from './transaction.dto';
import { User } from 'src/entities/user.entity';
import { CreateTransactionMoneyDto } from './transactionmoney.dto';
import { Account } from 'src/entities/account.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { QrcodeService } from 'src/qrcode/qrcode.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private readonly firebase: FirebaseService,
    private readonly qrCodeService: QrcodeService
  ) { }

  async saveTransaction(data: CreateTransactionDto) {
    try {
      const saveTransaction = await this.transactionRepository.save(data);
      return saveTransaction;
    } catch (error) {
      throw new BadRequestException('Failed to save transaction.');
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

    await this.accountRepository.query(`
     update account
      INNER JOIN card ON account.idAccount = card.idAccount
      INNER JOIN user ON user.idCard = card.idCard
      set amount = (amount - ${amount})
      where idUser = '${idUser}'
    `);

    await this.accountRepository.query(`
      update account

      INNER JOIN card ON account.idAccount = card.idAccount
      INNER JOIN marchand ON marchand.idCard = card.idCard
      set amount = (amount + ${amount})
      where idMarchand = '${idMarchand}'
    `);
    const recentQrCode = (await this.qrCodeService.getQrCode(idMarchand, amount))
    const result = await this.saveTransaction({
      idMarchand,
      idUser,
      idQrcode: recentQrCode.idQrcode,
      amount,
    });

    const newUserAmount = await this.usersRepository.query(`
      Select amount FROM card
      INNER JOIN account ON account.idAccount = card.idAccount
      INNER JOIN user ON user.idCard = card.idCard
      where idUser = '${idUser}'
    `);

    const newMarchandAmount = await this.usersRepository.query(`
      Select amount FROM card
      INNER JOIN account ON account.idAccount = card.idAccount
      INNER JOIN marchand ON marchand.idCard = card.idCard
      where idMarchand = '${idMarchand}'
    `);

    await this.firebase.addData(`/money`, {
      userAmount: newUserAmount[0].amount,
      marchandAmount: newMarchandAmount[0].amount,
    });

    return result;
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
