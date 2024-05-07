/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.getUser();

    //return this.userService.getUser()
  }

  @Post('create')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Delete('deleteUser')
  deleteUser(): string {
    return this.userService.deleteUser();
  }
  @Put('putUser')
  upDateUser(): string {
    return this.userService.upDateUser();
  }
}
