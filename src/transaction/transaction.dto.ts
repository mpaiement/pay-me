import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  idUser: string;

  @IsString()
  idMarchand: string;

  @IsUUID()
  idQrcode: string
}
