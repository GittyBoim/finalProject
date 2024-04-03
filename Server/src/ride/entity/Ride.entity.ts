import { ActTime } from "src/act-time/entity/ActTime.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

enum TargetAge {
    Child = 'child',
    Baby = 'baby',
    Teenager ='teenager',
    Adult = 'adult',
  }

@Entity({name:'rides'}) 
export class Ride
{
    @PrimaryGeneratedColumn({name:'rideId'})
    id:number;

    @Column({length:25, nullable:false})
	rideName:string;

    @Column({nullable:true, type: 'blob'})
    image:Buffer;

    @Column({nullable:true})
    description:string;
    
    @Column({nullable:false})
	numberSeats:number;

    @Column({nullable:false})
	duringUse:number;

    @Column({nullable:false})
	ageUser:number;

    @Column({ type: 'enum', enum: TargetAge, default: TargetAge.Adult, nullable:false})
    targetAge:TargetAge;

    @OneToMany(() => ActTime, (actTime) => actTime.ride)
    actTimes: ActTime[]

}