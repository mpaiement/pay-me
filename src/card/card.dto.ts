import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  cardNumber: string;

  @IsNumber()
  cvv: string;

  @IsDate()
  expiryDate: string;

  @IsNumber()
  cni: string;
}
