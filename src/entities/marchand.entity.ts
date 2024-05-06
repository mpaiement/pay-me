import { Column, Decimal128, Entity, JoinColumn, OneToOne, PrimaryColumn, Unique } from "typeorm";
import { Card } from "./card.entity";
@Unique ('uniqueEmail', ['email'])

@Entity({name:'marchand'})
export class Marchand {
    @PrimaryColumn('varchar')
    idMarchand: string;

    @Column('varchar')
    name: string;
    
    @Column('varchar')
    email: string;

    @Column('varchar')
    phone: Decimal128 ;
    transaction: any;
    qrcode: any;
    
    @OneToOne(() =>Card, (card) => card.marchand) // specify inverse side as a second parameter
    @JoinColumn()
    card: Card;
    
}