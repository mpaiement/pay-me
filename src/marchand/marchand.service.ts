import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Marchand } from 'src/entities/marchand.entity';
import { Repository } from 'typeorm';
import { CreateMarchandDto } from './marchand.dto';

@Injectable()
export class MarchandService {
  constructor(
    @InjectRepository(Marchand)
    private readonly marchandRepository: Repository<Marchand>,
  ) {}
  getMarchand() {
    return 'Route de get du Marchand';
  }
  async createMarchand(data: CreateMarchandDto) {
    console.log(data);
    const result = await this.marchandRepository.save(data);
    return result;
  }
  deleteMarchand() {
    return ' le Marchand est supprimé';
  }
  upDateMarchand() {
    return 'modifier les Marchand';
  }
}
