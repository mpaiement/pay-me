import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { BanqueService } from './banque.service';


@Controller('banque')
export class BanqueController {
  constructor(private readonly banqueService: BanqueService) {}

  @Get()
  getBanque(): string {
    return this.banqueService.getBanque()
  }
  @Post()
  createBanque(): string {
    return this.banqueService.createBanque()
  }
  @Delete()
  deleteBanque(): string {
    return this.banqueService.deleteBanque()
  }
  @Put()
  upDateBanque(): string {
    return this.banqueService.upDateBanque()
  }
}