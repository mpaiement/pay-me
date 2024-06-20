import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccount(): string {
    return this.accountService.getAccount();
  }
  @Post('create')
  createAccount(@Body() data: CreateAccountDto) {
    return this.accountService.createAccount(data);
  }
  @Delete()
  deleteAccount(): string {
    return this.accountService.deleteAccount();
  }
  @Put()
  upDateAccount(): string {
    return this.accountService.updateAccount();
  }
}
