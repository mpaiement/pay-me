import {
  Column,
  Decimal128,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Card } from './card.entity';
import { Transaction } from './transaction.entity';
@Unique('uniqueEmail', ['email'])
@Entity({ name: 'marchand' })
export class Marchand {
  @PrimaryColumn('varchar')
  idMarchand: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: Decimal128;

  @OneToMany(() => Transaction, (transaction) => transaction.idMarchand)
  transaction: Transaction;

  @OneToOne(() => Card) // specify inverse side as a second parameter
  @JoinColumn()
  card: Card;
}
