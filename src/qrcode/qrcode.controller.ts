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
  constructor(private readonly qrcodeService: QrcodeService) { }

  @Post('create')
  async createQrcode(@Body() { idMarchand, url, amount }: CreateQrcodeDto) {
    return this.qrcodeService.saveQrcode(idMarchand, amount, url);
  }

  @Get(':idMarchand/:amount')
  async generateQrCode(
    @Param('idMarchand') idMarchand: string,
    @Param('amount') amount: number,
  ) {
    return await this.qrcodeService.generateQrCode(idMarchand, amount);
  }
}
