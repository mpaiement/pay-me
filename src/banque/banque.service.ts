import { Injectable } from '@nestjs/common';

@Injectable()
export class BanqueService {
  getBanque(): string {
    return 'nom de banque';
  }
  createBanque(): string {
    return 'nom de banque';

  }
  deleteBanque(): string {
    return ' la banque est supprimee ';
  }
  upDateBanque(): string {
    return 'nom de banque';
  }
}