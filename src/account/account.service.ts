import { Injectable } from '@nestjs/common';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from './account.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const secretKey = 'c28b8bd3f146d5154ee88fd8cdae0450fc6280c8da7df53483e78e29209037c7';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) { }

  getAccount(): Promise<Account[]> {
    return this.accountRepository.find()
  }
  async getHistoriqueAdmin(idMarchand: string) {
    try {
      const historique = await this.accountRepository.query(`
        SELECT a.amount AS amounttran
        FROM account a
        INNER JOIN card c ON a.idAccount = c.idAccount
        INNER JOIN marchand m ON c.idCard = m.idCard
        WHERE m.idMarchand = '${idMarchand}'
      `);
      return historique;
    } catch (error) {
      throw new Error('Failed to fetch admin history');
    }
  }
  async getHistoriqueUser(idUser: string) {
    try {
      const historique = await this.accountRepository.query(`
        SELECT u.idUser, u.name AS username, a.amount AS amounttranuser
        FROM account a
        INNER JOIN card c ON a.idAccount = c.idAccount
        INNER JOIN user u ON c.idCard = u.idCard
        WHERE u.idUser = '${idUser}'
      `);
      return historique;
    } catch (error) {
      throw new Error('Failed to fetch user history');
    }
  }

  async getAllUsersWithAmounts() {
    try {
      const historique = await this.accountRepository.query(`
        SELECT u.idUser, u.name AS username, a.amount AS amounttranuser
        FROM account a
        INNER JOIN card c ON a.idAccount = c.idAccount
        INNER JOIN user u ON c.idCard = u.idCard
      `);
      return historique;
    } catch (error) {
      throw new Error('Failed to fetch users with amounts');
    }
  }


  async createAccount(data: CreateAccountDto): Promise<Account> {
    const concatString = `${data.userName}${data.userCardNumber}${data.userCni}`;

    console.log("🚀 ~ AccountService ~ createAccount ~ concatString:", concatString)
    const tokenHash = await bcrypt.hash(concatString, 10); // Adjust the salt rounds as necessary

    const account = this.accountRepository.create({
      accountNumber: data.accountNumber,
      amount: data.amount,
      userName: data.userName,
      userCni: data.userCni,
      userCardNumber: data.userCardNumber,
      accountToken: tokenHash // Store the hashed token
    });

    const result = await this.accountRepository.save(account);
    return result;
  }


  deleteAccount(): string {
    return 'le Account est supprimé';
  }

  updateAccount(): string {
    return 'nom de account';
  }
}
