import { IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  accountNumber: string;

  @IsNumber()
  amount: string;
}
