import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CardModule } from 'src/card/card.module';
import { Card } from 'src/entities/card.entity';
import { Account } from 'src/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Card, Account]), CardModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
