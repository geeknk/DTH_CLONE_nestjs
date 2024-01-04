import {Entity,Column,PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Subscription } from "./subscription.entity";
import { Channel } from "./channel.entity";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    category!:string;

    @Column()
    duration!:string;

    @Column()
    price!:string;
    
    @OneToMany(() => Subscription, subscribe => subscribe.plans)
    subscribe!:Subscription;

    @OneToMany(() => Channel, channel => channel.plan)
    channels!:Channel;
    
}