import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { QrCode } from 'src/entities/qrCode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QrCode])],
  controllers: [QrcodeController],
  providers: [QrcodeService],
  exports: [QrcodeService]
})
export class QrcodeModule { }
