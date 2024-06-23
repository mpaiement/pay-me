import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as qrcode from 'qrcode';
import { QrCode } from 'src/entities/qrCode.entity';
import { CreateQrcodeDto } from './qrcode.dto';
import { Repository } from 'typeorm';
@Injectable()
export class QrcodeService {
  constructor(
    @InjectRepository(QrCode)
    private readonly qrcodeRepository: Repository<QrCode>
  ) { }

  async createQrcode(qrcode: CreateQrcodeDto) {
    const result = await this.qrcodeRepository.save(qrcode);
    return result;
  }

  async generateQrCode(idMarchand: string, amount: number) {
    const url = `pay-me/qrcode/${idMarchand}/${amount}`;

    try {
      const qrCodeDataURL = await qrcode.toDataURL(url);

      if (!qrCodeDataURL) {
        throw new BadRequestException('Failed to generate QR code.')
      }

      const saveQrcode = await this.saveQrcode(idMarchand, amount, qrCodeDataURL);

      const result = {
        ...saveQrcode,
        qrCode: qrCodeDataURL,
      };

      return result;
    } catch (error) {
      throw new BadRequestException('Failed to generate QR code.', error);
    }
  }

  async saveQrcode(idMarchand: string, amount: number, url: string) {
    try {
      const saveQrcode = await this.qrcodeRepository.save({
        idMarchand,
        url,
        amount,
        createdAt: new Date()
      });
      return saveQrcode;
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Failed to save qrcode.', error);
    }
  }

  async getQrCode(idMarchand: string, amount: number) {
    console.log(idMarchand, amount);
    const result = await this.qrcodeRepository.createQueryBuilder()
      .select('idQrcode')
      .where('idMarchand = :idMarchand', { idMarchand })
      .orderBy('createdAt', 'ASC')
      .getRawOne();

    console.log(result)
    return result;
  }

}
