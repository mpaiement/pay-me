/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
  
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Card } from './card.entity';
import { UpdateUserCardDto } from 'src/user/user-card.dto';

@Entity({ name: 'user' })
@Unique('uniqueEmail', ['email'])
export class User {
  static idCard(idCard: any, data: UpdateUserCardDto) {
    throw new Error('Method not implemented.');
  }
  @PrimaryColumn('varchar')
  idUser: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;

  @OneToMany(() => Transaction, (transaction) => transaction.idUser)
  transaction: Transaction;

  @OneToOne(() => Card) 
  @JoinColumn({
    name:'idCard',
    referencedColumnName: 'idCard',
    foreignKeyConstraintName:'FK_user_card',
})
  idCard: Card['idCard'];
}
