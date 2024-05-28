/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException }from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
//import { CreateUserDto } from './user.dto';
import { CreateUserCardDto } from './usercard.dto';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/entities/card.entity';
import { UpdateUserCardDto } from './user-card.dto';


@Injectable()
export class UserService {
 // cardService: any;
 
  constructor(
    private readonly cardService: CardService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async getUser() {
    const result = await this.usersRepository.find();

    return result;
   }

   async recupererUser(idUser:string){
    const result = await this.usersRepository.query(`
    
    select * from user
      INNER JOIN card ON card.idCard = user.idCard
      where user.idUser ='${idUser}'
    `)
    return result;
  }

  
  async updateUser(idUser: string, data: UpdateUserCardDto) {
   
    const user = await this.usersRepository.findOneBy({ idUser });
      const updateUser=await this.usersRepository.update(idUser, 
       data
      );

      const updateCard =await this.cardRepository.update({idCard: user.idCard}, 
       data
      );
    
    return {...updateUser,...updateCard}
  }





  async createUser(idUser: string, data: CreateUserCardDto) {
    const card = await this.cardService.createCard(data);
    const user = this.usersRepository.create({
      idUser: idUser,
      name: data.name,
    email: data.email,
    phone: data.phone,
    cni: data.cni,
    idCard: card.idCard,
    });
    const result = await this.usersRepository.save( user);

    return {card: card, user: result}
    
   }

   async deleteUser(idUser: string) {
    const user = await this.usersRepository.findOneBy({ idUser });
    await this.usersRepository.delete(user.idUser);
}
}
