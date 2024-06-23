import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';
import { CreateTransactionMoneyDto } from './transactionmoney.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Get('historique/:idUser')
  async getHistoriqueUser(@Param('idUser') idUser: string) {
    return this.transactionService.getHistoriqueUser(idUser);
  }
  @Get('historique/marchand/:idMarchand')
  async getHistoriqueMarchand(@Param('idMarchand') idMarchand: string) {
    return this.transactionService.getHistoriqueMarchand(idMarchand);
  }

  @Post('transfertMoney')
  async getTransferMoney(@Body() data: CreateTransactionMoneyDto) {
    console.log('🚀 ~ TransactionController ~ getTransferMoney ~ data:', data);
    return this.transactionService.transferMoney(data);
  }

  @Post('create')
  async createTransaction(@Body() data: CreateTransactionDto) {
    return this.transactionService.saveTransaction(data);
  }
  @Delete('deleteTransaction')
  deleteTransaction(): string {
    return this.transactionService.deleteTransaction();
  }
  @Put('putTransaction')
  upDateTransaction(): string {
    return this.transactionService.upDateTransaction();
  }
}

