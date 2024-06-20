// /* eslint-disable prettier/prettier */
// import { Injectable, NotFoundException }from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/entities/user.entity';
// import { Repository } from 'typeorm';
// //import { CreateUserDto } from './user.dto';
// import { CreateUserCardDto } from './usercard.dto';
// import { CardService } from 'src/card/card.service';
// import { Card } from 'src/entities/card.entity';
// import { UpdateUserCardDto } from './user-card.dto';

// import * as jwt from 'jsonwebtoken';
// import { Account } from 'src/entities/account.entity';
// import { get } from 'http';

// const secretKey = 'c28b8bd3f146d5154ee88fd8cdae0450fc6280c8da7df53483e78e29209037c7';


// @Injectable()
// export class UserService {
//  // cardService: any;
 
//   constructor(
//     private readonly cardService: CardService,

//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//     @InjectRepository(Card)
//     private cardRepository: Repository<Card>,
//     @InjectRepository(Account)
//     private accountRepository: Repository<Account>,
//   ) {}

//   async getUser() {
//     const result = await this.usersRepository.find();

//     return result;
//    }

//    async recupererUser(idUser:string){
//     const result = await this.usersRepository.query(`
    
//     select * from user
//       INNER JOIN card ON card.idCard = user.idCard
//       where user.idUser ='${idUser}'
//     `)
//     return result;
//   }

  
  
//   async updateUser(idUser: string, data: UpdateUserCardDto) {
   
//     const user = await this.usersRepository.findOneBy({ idUser });
//     const { name, email, phone ,cni } = data;
//       const updateUser=await this.usersRepository.update(idUser, 
//         {
//           name,
//           email,
//           phone,
//           cni
//       });

//       const { cardNumber, cvv } = data;
//       const updateCard =await this.cardRepository.update({idCard: user.idCard}, 
//         {
//           cardNumber,
//           cvv
          
//       });
      
    
//     return {...updateUser,...updateCard}
//   }

//   async createUser(idUser: string, data: CreateUserCardDto) {
//     const payload = {
//       userName: data.name,
//       userCardNumber: data.cardNumber,
//       userCni: data.cni
//     };
//     const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
//     console.log("🚀 ~ UserService ~ createUser ~ token:", token)
    
//     const userToken = token.decode();
//     console.log("🚀 ~ UserService ~ createUser ~ userToken:", userToken)
  
//     let idAccount: string;

//     const query = await this.accountRepository.createQueryBuilder()
//     .select('accountToken')
//     .execute()

//     query.map(async (value) => {
//       const decodedToken = value.decode();
//       if (JSON.stringify(decodedToken) === JSON.stringify(userToken)) {
//         const result = await this.accountRepository.find({ where: { accountToken: decodedToken}})
//         idAccount = result[0].idAccount

//       }
//     })

//     // .where('accountToken= :conditionToken', {conditionToken})

//     const card = await this.cardService.createCard({
//       cardNumber: data.cardNumber,
//       cvv : data.cvv,
//       expiryDate : data.expiryDate,
//      idAccount,
//     });
//     const user = this.usersRepository.create({
//     idUser: idUser,
//     name: data.name,
//     email: data.email,
//     phone: data.phone,
//     cni: data.cni,
//     idCard: card.idCard,
    
//     });
//     const result = await this.usersRepository.save( user);

//     return {card: card, user: result}
    
//    }

//    async deleteUser(idUser: string) {
//     const user = await this.usersRepository.findOneBy({ idUser });
//     await this.usersRepository.delete(user.idUser);
// }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserCardDto } from './usercard.dto';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/entities/card.entity';
import { UpdateUserCardDto } from './user-card.dto';

import * as jwt from 'jsonwebtoken';
import { Account } from 'src/entities/account.entity';

const secretKey = 'c28b8bd3f146d5154ee88fd8cdae0450fc6280c8da7df53483e78e29209037c7';

@Injectable()
export class UserService {
  constructor(
    private readonly cardService: CardService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getUser() {
    const result = await this.usersRepository.find();
    return result;
  }

  async recupererUser(idUser: string) {
    const result = await this.usersRepository.query(`
      SELECT * FROM user
      INNER JOIN card ON card.idCard = user.idCard
      WHERE user.idUser ='${idUser}'
    `);
    return result;
  }

  async updateUser(idUser: string, data: UpdateUserCardDto) {
    const user = await this.usersRepository.findOneBy({ idUser });
    const { name, email, phone, cni } = data;
    const updateUser = await this.usersRepository.update(idUser, {
      name,
      email,
      phone,
      cni,
    });

    const { cardNumber, cvv } = data;
    const updateCard = await this.cardRepository.update({ idCard: user.idCard }, {
      cardNumber,
      cvv,
    });

    return { ...updateUser, ...updateCard };
  }

  async createUser(idUser: string, data: CreateUserCardDto) {
    const payload = {
      userName: data.name,
      userCardNumber: data.cardNumber,
      userCni: data.cni,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log("🚀 ~ UserService ~ createUser ~ token:", token);

    const userToken = jwt.decode(token);
    console.log("🚀 ~ UserService ~ createUser ~ userToken:", userToken);

    let idAccount: string;

    const query = await this.accountRepository.createQueryBuilder()
      .select('accountToken')
      .execute();
    console.log("🚀 ~ UserService ~ createUser ~ query:", query)

    for (const value of query) {
      const decodedToken = jwt.decode(value.accountToken);
      console.log("🚀 ~ UserService ~ createUser ~ decodedToken:", decodedToken)
      console.log("🚀 ~ UserService ~ createUser ~  (decodedToken === userToken):",  (decodedToken === userToken))
      if (decodedToken === userToken) {
       
        
        const result = await this.accountRepository.find({ where: { accountToken: value.accountToken } });
        idAccount = result[0].idAccount;
        
      }
     
    }

    const card = await this.cardService.createCard({
      cardNumber: data.cardNumber,
      cvv: data.cvv,
      expiryDate: data.expiryDate,
      idAccount,
    });
    const user = this.usersRepository.create({
      idUser: idUser,
      name: data.name,
      email: data.email,
      phone: data.phone,
      cni: data.cni,
      idCard: card.idCard,
    });
    const result = await this.usersRepository.save(user);

    return { card: card, user: result };
  }

  async deleteUser(idUser: string) {
    const user = await this.usersRepository.findOneBy({ idUser });
    await this.usersRepository.delete(user.idUser);
  }
}
