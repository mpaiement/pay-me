import { Injectable } from '@nestjs/common';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from './account.dto';
import * as jwt from 'jsonwebtoken';

const secretKey = 'c28b8bd3f146d5154ee88fd8cdae0450fc6280c8da7df53483e78e29209037c7';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  getAccount(): string {
    return 'nom de Account';
  }

  async createAccount(data: CreateAccountDto): Promise<Account> {
    const payload = {
      userName: data.userName,
      userCardNumber: data.userCardNumber,
      userCni: data.userCni
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    const account = this.accountRepository.create({
      accountNumber: data.accountNumber,
      amount: data.amount,
      userName: data.userName,
      userCni: data.userCni,
      userCardNumber: data.userCardNumber,
      accountToken: token
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
