import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateMarchandDto {
  @IsString()
  idMarchand: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('DZ')
  phone: string;
}
