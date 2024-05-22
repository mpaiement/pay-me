import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateUserCardDto {
  @IsString()
  idUser: string;

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
