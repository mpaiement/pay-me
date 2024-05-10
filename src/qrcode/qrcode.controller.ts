import { Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Get()
  getQrcode(): string {
    return this.qrcodeService.getQrcode();
  }
  @Post()
  createQrcode(): string {
    return this.qrcodeService.createQrcode();
  }
  @Delete()
  deleteQrcode(): string {
    return this.qrcodeService.deleteQrcode();
  }
  @Put()
  upDateQrcode(): string {
    return this.qrcodeService.upDateQrcode();
  }

  @Get(':idMarchand/:amount')
  async generateQrCode(
    @Param('idMarchand') idMarchand: string,
    @Param('amount') amount: number,
  ) {
    return await this.qrcodeService.generateQrCode(idMarchand, amount);
  }
}
