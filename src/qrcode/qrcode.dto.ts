import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateQrcodeDto {
  @IsUrl()
  url: string;

  @IsString()
  idMarchand: string;

  @IsNumber()
  amount: number;
}
