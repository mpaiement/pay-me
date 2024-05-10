import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marchand } from './marchand.entity';
import { Card } from './card.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'qrCode' })
export class QrCode {
  @PrimaryGeneratedColumn('uuid')
  idqrcode: string;

  url: string;

  @OneToOne(() => Transaction) // specify inverse side as a second parameter
  @JoinColumn()
  transaction: Transaction;

  @OneToOne(() => Marchand) // specify inverse side as a second parameter
  @JoinColumn()
  marchand: Marchand;

  @OneToOne(() => Card) // specify inverse side as a second parameter
  @JoinColumn()
  card: Card;
}
