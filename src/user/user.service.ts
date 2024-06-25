/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserCardDto } from './usercard.dto';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/entities/card.entity';
import { UpdateUserCardDto } from './user-card.dto';
import { Account } from 'src/entities/account.entity';
import * as bcrypt from 'bcrypt'

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
  ) { }

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
  // Import bcrypt library

  async createUser(idUser: string, data: CreateUserCardDto) {
    let idAccount: string;
    const userHash = `${data.name}${data.cardNumber}${data.cni}`;

    // Find all accounts and compare hashes
    const accounts = await this.accountRepository.find();

    for (const account of accounts) {
      const storedHashedPassword = account.accountToken;
      const isMatch = await bcrypt.compare(userHash, storedHashedPassword);

      if (isMatch) {
        idAccount = account.idAccount;
        break; // Exit loop once a match is found
      }
    }

    if (!idAccount) {
      throw new Error('No account found with matching credentials.');
    }

    // Create card
    const card = await this.cardService.createCard({
      cardNumber: data.cardNumber,
      cvv: data.cvv,
      expiryDate: data.expiryDate,
      idAccount,
    });

    // Create user
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
