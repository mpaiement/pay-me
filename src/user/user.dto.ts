/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsPhoneNumber, IsNumber } from 'class-validator';
export class CreateUserDto {
  @IsString()
  idUser: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
  @IsNumber()
  cni: string;

}
