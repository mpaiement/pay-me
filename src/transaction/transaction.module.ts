import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { Account } from 'src/entities/account.entity'
import { QrcodeModule } from 'src/qrcode/qrcode.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User, Account]), QrcodeModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule { }
