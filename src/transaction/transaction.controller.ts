import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  

  @Get('getTransaction')
  getTransaction(): string {
    return this.transactionService.getTransaction();
  }

  @Post('create')
  async createTransaction(
    @Body() data: CreateTransactionDto,
  ) {
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
