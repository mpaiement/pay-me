import {
  Column,
  CreateDateColumn,
  Decimal128,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Card } from './card.entity';
import { QrCode } from './qrCode.entity';
import { Marchand } from './marchand.entity';

@Entity({ name: 'transaction' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  idTransaction: string;

  @Column('decimal')
  amount: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => User, (user) => user.transaction)
  @JoinColumn({ name: 'idUser' })
  idUser: User;

  @OneToOne(() => QrCode) // specify inverse side as a second parameter
  @JoinColumn()
  qrcode: QrCode;

  @ManyToOne(() => Marchand, (marchand) => marchand.transaction)
  @JoinColumn({ name: 'idMarchand' })
  idMarchand: Marchand;
}
