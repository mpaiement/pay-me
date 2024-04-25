import { Module } from '@nestjs/common';
import { MarchandController } from './marchand.controller';
import { MarchandService } from './marchand.service';

@Module({
  imports: [],
  controllers: [MarchandController],
  providers: [MarchandService],
})

export class MarchandModule {}