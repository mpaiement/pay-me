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
import { QrCode } from './qrCode.entity';
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
  phone: string;

  @OneToMany(() => Transaction, (transaction) => transaction.idMarchand)
  transaction: Transaction;

  // One Marchand can have many QrCodes
  @OneToMany(() => QrCode, (qrCode) => qrCode.idMarchand)
  qrCodes: QrCode[];

  @OneToOne(() => Card)
  @JoinColumn({
    name: 'idCard',
    referencedColumnName: 'idCard',
    foreignKeyConstraintName: 'FK_marchand_card',
  })
  idCard: Card['idCard'];
}
