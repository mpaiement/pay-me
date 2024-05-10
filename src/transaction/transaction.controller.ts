import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async saveTransaction(idMarchand: string, idUser: string, amount: number) {
    try {
      const saveTransaction = await this.transactionService.saveTransaction(
        idMarchand,
        idUser,
        amount,
      );
      return saveTransaction;
    } catch (error) {
      return Error('Failed to save transaction.');
    }
  }

  @Get('getTransaction')
  getTransaction(): string {
    return this.transactionService.getTransaction();
  }

  @Post('create')
  async createTransaction(
    @Body() { idUser, idMarchand, amount }: CreateTransactionDto,
  ) {
    return this.transactionService.saveTransaction(idUser, idMarchand, amount);
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
