import {Entity,Column,PrimaryGeneratedColumn,BaseEntity, ManyToOne} from "typeorm"
import { Plan } from "./plan.entity";

@Entity()
export class Channel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    category!:string;

    @Column()
    name!:string;
    
    @Column()
    planId!:number;

    @ManyToOne(() => Plan, plan => plan.channels)
    plan!:Plan;
}