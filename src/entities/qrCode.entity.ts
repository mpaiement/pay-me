import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marchand } from './marchand.entity';

@Entity({ name: 'qr_code' })
export class QrCode {
  @PrimaryGeneratedColumn('uuid')
  idQrcode: string;

  @Column('text')
  url: string;

  @Column('decimal', { precision: 10, scale: 6 })
  amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Many QrCodes can belong to one Marchand
  @ManyToOne(() => Marchand, (marchand) => marchand.qrCodes, { nullable: false })
  @JoinColumn({
    name: 'idMarchand',
    referencedColumnName: 'idMarchand',
    foreignKeyConstraintName: 'FK_qrcode_marchand',
  })
  idMarchand: Marchand['idMarchand'];
}
