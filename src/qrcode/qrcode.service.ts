import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
@Injectable()
export class QrcodeService {
  getQrcode(): string {
    return 'la route du qr code';
  }
  createQrcode(): string {
    return 'la routr  du nouveau qrcode';
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
}
