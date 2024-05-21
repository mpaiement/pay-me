import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CardModule } from 'src/card/card.module';
import { Card } from 'src/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Card]), CardModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
