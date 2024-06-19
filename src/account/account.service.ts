import { Injectable } from '@nestjs/common';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from './account.dto';
@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    
  ) {}
  getAccount(): string {
    return 'nom de Account';
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
  

  async createAccount(data: CreateAccountDto) {
    const result = await this.accountRepository.save(data);
    return result;
  }
  deleteAccount(): string {
    return ' le Account est supprimee ';
  }
  upDateAccount(): string {
    return 'nom de account';
  }
}
