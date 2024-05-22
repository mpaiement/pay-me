/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './user.dto';
import { CreateUserCardDto } from './usercard.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.getUser();

    //return this.userService.getUser()
  }
  @Get(':idUser')
    async recupererUser(@Param('idUser') idUser: string,)
    {
  return await  this.userService.recupererUser(idUser);
  }


  @Post('create')
  async createUser(@Body() data: CreateUserCardDto) {
    const idUser = data.idUser;
    return await this.userService.createUser(idUser, data);
  }

  @Delete('deleteUser')
  deleteUser(): string {
    return this.userService.deleteUser();
  }
  @Put(':idUser')
  async updateUser(@Param('idUser') idUser: string, @Body() data: CreateUserCardDto) {
    return await this.userService.updateUser(idUser, data);
  }
}
