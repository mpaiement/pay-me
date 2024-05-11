import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marchand } from './marchand.entity';

@Entity({ name: 'qr_code' })
export class QrCode {
  @PrimaryGeneratedColumn('uuid')
  idQrcode: string;

  @Column('text')
  url: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @OneToOne(() => Marchand)
  @JoinColumn({
    name: 'idMarchand',
    referencedColumnName: 'idMarchand',
    foreignKeyConstraintName: 'FK_qrcode_marchand',
  })
  idMarchand: Marchand['idMarchand'];
}
