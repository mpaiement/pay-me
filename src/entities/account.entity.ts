import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'account'})
 
export class Account{

    @PrimaryGeneratedColumn('uuid')
    idAccount: string;

    @Column('varchar')
    accountNumber: string;

    @Column('float')
    amount: string;

    @CreateDateColumn()
    createdDate: Date
    
    @UpdateDateColumn()
    updatedDate: Date
    card: any;


}