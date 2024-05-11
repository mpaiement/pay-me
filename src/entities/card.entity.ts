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
  idCard: string;

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

  @OneToOne(() => Account)
  @JoinColumn({
    name: 'idAccount',
    referencedColumnName: 'idAccount',
    foreignKeyConstraintName: 'FK_card_account',
  })
  idAccount: Account['idAccount'];
}
