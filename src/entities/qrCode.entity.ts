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

  @Column()
  url: string;
  @Column()
  amount: number;

 

  @OneToOne(() => Marchand) // specify inverse side as a second parameter
  @JoinColumn()
  idMarchand: Marchand['idMarchand'];

  

  

}
