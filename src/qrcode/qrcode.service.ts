import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as qrcode from 'qrcode';
import { QrCode } from 'src/entities/qrCode.entity';
import { CreateQrcodeDto } from './qrcode.dto';
import { Repository } from 'typeorm';
@Injectable()
export class QrcodeService {
  [x: string]: any;
  @InjectRepository(QrCode)
  private readonly qrcodeRepository: Repository<QrCode>;

  async createQrcode(qrcode: CreateQrcodeDto) {
    const result = await this.qrcodeRepository.save(qrcode);
    return result;
  }
  getQrcode(): string {
    return 'la route du qr code';
  }

  deleteQrcode(): string {
    return ' le qrcode est supprime ';
  }
  upDateQrcode(): string {
    return 'le qrcode et met a jour';
  }

  async generateQrCode(idMarchand: string, amount: number) {
    const url = `pay-me/qrcode/${idMarchand}/${amount}`;
    try {
      const qrCodeDataURL = await qrcode.toDataURL(url);
      console.log(qrCodeDataURL);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code.');
    }
  }
  async saveQrcode(idMarchand: string, amount: number, url: string) {
    try {
      const saveQrcode = await this.qrcodeRepository.save({
        idMarchand,
        url,
        amount,
      });
      return saveQrcode;
    } catch (error) {
      return Error('Failed to save qrcode.');
    }
  }
}