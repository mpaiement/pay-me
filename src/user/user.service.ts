/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
//import { CreateUserDto } from './user.dto';
import { CreateUserCardDto } from './usercard.dto';
import { CardService } from 'src/card/card.service';


@Injectable()
export class UserService {
 // cardService: any;
 
  constructor(
    private readonly cardService: CardService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
    
   
  ) {}

  async getUser() {
    const result = await this.usersRepository.find();

    return result;
   }

  async recupererUser(idUser: string){
    const result = await this.usersRepository.findOneBy({ idUser });
    
    return result;


  }
  //  async createUser(data: CreateUserDto) {
  //    const result = await this.usersRepository.save(data);
  //   return result;
  //  }
  async createUser(idUser: string, data: CreateUserCardDto) {
    const card = await this.cardService.createCard(data);
    const user = this.usersRepository.create({
      idUser: idUser,
      name: data.name,
    email: data.email,
    phone: data.phone,
      
    idCard: card.idCard,
    });
    const result = await this.usersRepository.save( user);

    return {card: card, user: result}
    
   }

  deleteUser() {
    return ' le user est supprimé';
  }
  upDateUser() {
    return 'modification du username';
  }
}
