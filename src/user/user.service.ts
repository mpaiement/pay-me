/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser() {
    const result = await this.usersRepository.find();

    return result;
  }
  async createUser(data: CreateUserDto) {
    const result = await this.usersRepository.save(data);
    return result;
  }
  deleteUser() {
    return ' le user est supprimé';
  }
  upDateUser() {
    return 'modification du username';
  }
}
