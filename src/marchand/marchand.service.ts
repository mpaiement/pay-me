import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Marchand } from 'src/entities/marchand.entity';
import { Repository } from 'typeorm';
import { CreateMarchandDto } from './marchand.dto';
import { CardService } from 'src/card/card.service';
import { Account } from 'src/entities/account.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class MarchandService {
  constructor(
    @InjectRepository(Marchand)
    private readonly marchandRepository: Repository<Marchand>,
    private readonly cardService: CardService,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

  ) { }
  getMarchand() {
    return 'Route de get du Marchand';
  }
  async recupererMarchand(idMarchand: string) {
    const result = await this.marchandRepository.query(`
    select * from marchand
      where marchand.idMarchand ='${idMarchand}'
    `);
    return result;
  }

  async createMarchand(data: CreateMarchandDto) {
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
    // Create card
    const card = await this.cardService.createCard({
      cardNumber: data.cardNumber,
      cvv: data.cvv,
      expiryDate: data.expiryDate,
      idAccount,
    });

    // Create marchand
    const marchand = this.marchandRepository.create({
      idMarchand: data.idMarchand,
      name: data.name,
      email: data.email,
      phone: data.phone,
      idCard: card.idCard,
    });
    const result = await this.marchandRepository.save(marchand);
    return result;
  }
  deleteMarchand() {
    return ' le Marchand est supprimé';
  }
  upDateMarchand() {
    return 'modifier les Marchand';
  }
}
