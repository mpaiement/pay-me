/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
  Decimal128,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Card } from './card.entity';

@Entity({ name: 'user' })
@Unique('uniqueEmail', ['email'])
export class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;

  @OneToMany(() => Transaction, (transaction) => transaction.idUser)
  transaction: Transaction;

  @OneToOne(() => Card, {
    createForeignKeyConstraints: false,
  }) // specify inverse side as a second parameter
  @JoinColumn()
  card: Card;
}
