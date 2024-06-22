import { IsNumber, IsString } from 'class-validator';
export class CreateTransactionMoneyDto {
  @IsString()
  idUser: string;

  @IsString()
  idMarchand: string;

  @IsNumber()
  amount: number;

  @IsString()
  idQrcode: string;
}
