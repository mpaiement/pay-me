import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { AccountService } from './account.service';


@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccount(): string {
    return this.accountService.getAccount()
  }
  @Post()
  createAccount(): string {
    return this.accountService.createAccount()
  }
  @Delete()
  deleteAccount(): string {
    return this.accountService.deleteAccount()
  }
  @Put()
  upDateAccount(): string {
    return this.accountService.upDateAccount()
  }
}