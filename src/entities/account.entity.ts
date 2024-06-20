import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  idAccount: string;

  @Column('varchar')
  accountNumber: string;

  @Column('float')
  amount: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column('varchar')
  userName: string;

  @Column('varchar')
  userCni: string;

  @Column('varchar')
  userCardNumber: string;

  @Column('varchar')
  accountToken: string;
}
