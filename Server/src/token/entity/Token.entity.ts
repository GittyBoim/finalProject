import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { User } from "src/user/entity/User.entity";


@Entity({name:'tokens'})
@Unique(['deviceId', 'user']) 
export class Token
{
    @PrimaryGeneratedColumn({name:'tokenId'})
    id:number;
    
    @Column({length:200, nullable:false})
    token:string;

    @Column({length:50, nullable:false})
    deviceId:string;
    // , unique:true

    @ManyToOne(() => User, (user)=> user.tokens, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user:User;
}