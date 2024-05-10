import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { CreateQrcodeDto } from './qrcode.dto';
@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}


  @Get()
  getQrcode(): string {
    return this.qrcodeService.getQrcode();
  }
  @Post('create')
  async createQrcode(@Body() { idMarchand, url, amount }: CreateQrcodeDto) {
    return this.qrcodeService.saveQrcode(idMarchand, amount, url);
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
