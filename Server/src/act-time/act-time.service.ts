import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActTime } from './entity/ActTime.entity';


@Injectable()
export class ActTimeService 
{
    constructor( 
        @InjectRepository(ActTime)
        private actTimeRepository: Repository<ActTime>,
        ){}

    async findAll(): Promise<ActTime[]>
    { 
        try{
            return await this.actTimeRepository.find({
                relations:['ride']
            });
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async findOne(id:number): Promise<ActTime | null>
    {
        try{
            return await this.actTimeRepository.findOneOrFail({
                where:{id},
                relations:['ride'],
            });
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
            
    }

    async create(actTime:ActTime):Promise<void>
    {
        try{
            await this.actTimeRepository.insert(actTime);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
         
    }

    async update(id:number, actTime:ActTime):Promise<void>
    {
        try{
            await this.actTimeRepository.update(id,actTime);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async remove(id:number):Promise<void>
    {
        try{
            await this.actTimeRepository.delete(id);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
    
    async getByRideId(rideId:number):Promise<any[]>
    {
        try{
            const actTimes = await this.actTimeRepository.find({relations:['ride','users'], where:{ride:{id:rideId}}});

            const availableActTimes = actTimes.filter((actTime)=> {
                return actTime.users.length <= actTime.ride.numberSeats;
            }).map((actTime)=> {
                return {
                    id:actTime.id,
                    timeStart:actTime.timeStart,
                    numberAvailableSeats:actTime.ride.numberSeats - actTime.users.length,
                }
            })
            
            return availableActTimes;
        }
        catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}
