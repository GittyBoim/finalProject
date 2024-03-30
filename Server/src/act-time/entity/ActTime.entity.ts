import { Ride } from "src/ride/entity/Ride.entity";
import { User } from "src/user/entity/User.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";


@Entity({name:'act_times'}) 
export class ActTime
{
    @PrimaryGeneratedColumn({name:'actTimeId'})
    id:number;

    @ManyToOne(() => Ride, (ride) => ride.actTimes, {nullable:false})
    @JoinColumn({ name: 'rideId'})
    ride:Ride;

    @Column({type:'time', nullable:false})
    timeStart:Date;

    @ManyToMany(()=> User, (user)=> user.actTimes)
    users:User[];
}
