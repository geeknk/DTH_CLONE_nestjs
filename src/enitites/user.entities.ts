import {Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany} from "typeorm"
import { Subscription } from "./subscription.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    firstname!: string;
    
    @Column()
    lastname!: string;
    
    @Column()
    email!: string;
    
    @Column()
    password!: string;
    
    @Column()
    mobile!: number;
    
    @Column()
    role!: number;

    @OneToMany(() => Subscription, subscribe => subscribe.user)
    subscribe!:Subscription;
}