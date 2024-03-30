import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, } from "typeorm";
import { Role } from "src/roles/roles.enum";
import { ActTime } from "src/act-time/entity/ActTime.entity";
import { Token } from "src/token/entity/Token.entity";


@Entity({name:'users'}) 
export class User
{
    @PrimaryGeneratedColumn({name:'userId'})
    id:number;

    @Column({length:25, nullable:false})
    userName:string;

    @Column({length:100, nullable:false, unique:true})
    idNumber:string;

    @ManyToOne(() => User, (user)=> user.id, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parent:User;

    @Column({length:10, nullable:true})
    phone:string;

    @Column({nullable:false})
    age:number;
    
    @Column({type :'enum', enum : Role, default : Role.User, nullable:false})
    role:Role;

    @OneToMany(()=> Token, (token)=> token.user)
    tokens:Token[];

    @ManyToMany(()=> ActTime, (ActTime)=> ActTime.users)
    @JoinTable({
        name: 'queues',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'actTimeId', referencedColumnName: 'id' },
      })
    actTimes:ActTime[];

}