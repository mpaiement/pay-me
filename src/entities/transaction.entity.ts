import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

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
  @JoinColumn({
    name: 'idUser',
    referencedColumnName: 'idUser',
    foreignKeyConstraintName: 'FK_transaction_user',
  })
  idUser: User['idUser'];

  @OneToOne(() => QrCode, { createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'idQrcode',
    referencedColumnName: 'idQrcode',
    foreignKeyConstraintName: 'FK_transaction_qrcode',
  })
  idQrcode: QrCode['url'];

  @ManyToOne(() => Marchand, (marchand) => marchand.transaction)
  @JoinColumn({
    name: 'idMarchand',
    referencedColumnName: 'idMarchand',
    foreignKeyConstraintName: 'FK_transaction_marchand',
  })
  idMarchand: Marchand['idMarchand'];
}
