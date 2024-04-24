import { Module } from '@nestjs/common';
import { BanqueService } from './banque.service';
import { BanqueController } from './banque.controller';

@Module({
  imports: [],
  controllers: [BanqueController],
  providers: [BanqueService],
})
export class BanqueModule {}