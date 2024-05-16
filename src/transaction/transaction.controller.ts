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
  constructor(private readonly transactionService: TransactionService) {}

  @Get('getTransaction')
  async getTransaction() {
    return this.transactionService.getTransaction();
  }
  @Get('transferMoney/:idUser/:amount/:idMarchand')
  async getTransferMoney(@Param() data: CreateTransactionMoneyDto) {
    console.log("🚀 ~ TransactionController ~ getTransferMoney ~ data:", data)
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
