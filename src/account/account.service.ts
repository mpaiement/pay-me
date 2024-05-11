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
