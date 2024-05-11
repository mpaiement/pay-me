/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';
export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
}
