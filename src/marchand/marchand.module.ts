import { Module } from '@nestjs/common';
import { MarchandController } from './marchand.controller';
import { MarchandService } from './marchand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marchand } from 'src/entities/marchand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marchand])],
  controllers: [MarchandController],
  providers: [MarchandService],
})

export class MarchandModule {}