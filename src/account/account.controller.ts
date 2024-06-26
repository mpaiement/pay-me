import { Controller, Get, Post, Delete, Put, Body, Param, } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './account.dto';
import { Account } from 'src/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get()
  async getAccount(): Promise<Account[]> {
    return await this.accountService.getAccount();
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
  @Get('admin/:idMarchand')
  async getHistoriqueAdmin(@Param('idMarchand') idMarchand: string) {
    return this.accountService.getHistoriqueAdmin(idMarchand);
  }
  @Get('user/:idUser')
  async getHistoriqueUser(@Param('idUser') idUser: string) {
    return this.accountService.getHistoriqueUser(idUser);
  }
  @Get('user')
  async getAllUsersWithAmounts() {
    return this.accountService.getAllUsersWithAmounts();
  }
}
