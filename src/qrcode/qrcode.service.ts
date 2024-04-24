import { Injectable } from '@nestjs/common';

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
}