import { Column, Decimal128, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { Marchand } from "./marchand.entity";
import { Card } from "./card.entity";

@Entity({name:'qrCode'})

export class QrCode{
    @PrimaryGeneratedColumn('uuid')
    idqrcode: string;
    
    transaction: any;

    @OneToOne(() =>Marchand, (marchand) => marchand.qrcode) // specify inverse side as a second parameter
    @JoinColumn()
    marchand: Marchand;

    @OneToOne(() =>Card, (card) => card.qrcode) // specify inverse side as a second parameter
    @JoinColumn()
    card: Card;

}