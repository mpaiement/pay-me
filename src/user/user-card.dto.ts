import { PartialType } from '@nestjs/swagger';
import { CreateUserCardDto } from './usercard.dto';

export class UpdateUserCardDto extends PartialType(CreateUserCardDto) {}
