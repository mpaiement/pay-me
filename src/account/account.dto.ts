import { IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  accountNumber: string;

  @IsNumber()
  amount: number;

  @IsString()
  userName: string;

  @IsString()
  userCni: string;

  @IsString()
  userCardNumber: string;

  @IsString()
  accountToken: string;
}
