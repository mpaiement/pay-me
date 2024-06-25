import { IsDate, IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateMarchandDto {
  @IsString()
  idMarchand: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  cardNumber: string;

  @IsNumber()
  cvv: string;

  @IsDate()
  expiryDate: string;

  @IsNumber()
  cni: string;
}
