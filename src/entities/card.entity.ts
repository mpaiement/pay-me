import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity({ name: 'card' })
export class Card {
  @PrimaryGeneratedColumn('uuid')
  idcard: string;

  @Column('varchar')
  cardNumber: string;

  @Column('varchar')
  cvv: string;

  @Column('varchar')
  expiryDate: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToOne(() => Account) // specify inverse side as a second parameter
  @JoinColumn()
  account: Account;
}
