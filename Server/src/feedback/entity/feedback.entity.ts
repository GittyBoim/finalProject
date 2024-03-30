import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'feedback'}) 
export class Feedback
{
    @PrimaryGeneratedColumn({name:'feedbackId'})
    id:number;

    @Column({length:50, nullable:false})
    userName:string;

    @Column({length:1000, nullable:false})
    content:string;

    @Column({nullable:false, default:0})
    countStars:number;
}