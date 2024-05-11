import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { MarchandService } from './marchand.service';
import { CreateMarchandDto } from './marchand.dto';

@Controller('marchand')
export class MarchandController {
  constructor(private readonly marchandService: MarchandService) {}

  @Get('getMarchand')
  getMarchand(): string {
    return this.marchandService.getMarchand();
  }

  @Post('create')
  async createMarchand(@Body() data: CreateMarchandDto) {
    return await this.marchandService.createMarchand(data);
  }
  @Delete('deleteMarchand')
  deleteMarchand(): string {
    return this.marchandService.deleteMarchand();
  }
  @Put('putMarchand')
  upDateMarchand(): string {
    return this.marchandService.upDateMarchand();
  }
}
