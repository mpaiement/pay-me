import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marchand } from './marchand.entity';

@Entity({ name: 'qrCode' })
export class QrCode {
  @PrimaryGeneratedColumn('uuid')
  idQrcode: string;

  @Column()
  url: string;
  @Column()
  amount: number;

  @OneToOne(() => Marchand) // specify inverse side as a second parameter
  @JoinColumn({
    name: 'idMarchand',
    referencedColumnName: 'idMarchand',
    foreignKeyConstraintName: 'FK_qrcode_marchand',
  })
  idMarchand: Marchand['idMarchand'];
}
