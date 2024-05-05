import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity({name: 'card'})

export class Card {

    @PrimaryGeneratedColumn('uuid')
    idcard : string;
    
    @Column('varchar')
    cardNumber : string;

    @Column('varchar')
    cvv: string;
    
    @Column('varchar')
    experyDate : string;
    
    @Column('varchar')
    password : string;

    @CreateDateColumn()
    createdDate: Date
    
    @UpdateDateColumn()
    updatedDate: Date

    @DeleteDateColumn()
    deletedDate: Date
    
    user: any;
    marchand: any;
    qrcode: any;

    @OneToOne(() =>Account, (account) => account.card) // specify inverse side as a second parameter
    @JoinColumn()
    account: Account;
}