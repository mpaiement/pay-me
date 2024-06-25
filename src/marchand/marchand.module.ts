import { Module } from '@nestjs/common';
import { MarchandController } from './marchand.controller';
import { MarchandService } from './marchand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marchand } from 'src/entities/marchand.entity';
import { Account } from 'src/entities/account.entity';
import { CardService } from 'src/card/card.service';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Marchand, Account]), CardModule],
  controllers: [MarchandController],
  providers: [MarchandService],

})
export class MarchandModule { }
