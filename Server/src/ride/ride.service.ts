import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from 'src/ride/entity/Ride.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RideService 
{
    constructor( 
        @InjectRepository(Ride)
        private rideRepository: Repository<Ride>,
        ){}
        
    async findAll(): Promise<Ride[]>
    { 
        try{
            return await this.rideRepository.find({ relations: ['actTimes'] });
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
       
    }

    async findOne(id:number): Promise<Ride| null>
    {
        try{
            return await this.rideRepository.findOneOrFail({where:{id}, relations:['actTimes']});
        }catch(err){
            throw new HttpException(err.message, err.statusR);
        }
    }

    async create(newRide:Ride):Promise<void>
    {
        try{
            await this.rideRepository.insert(newRide);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async update(id:number, ride:Ride):Promise<void>
    {
        try{
            await this.rideRepository.update(id,ride);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async remove(id:number):Promise<void>
    {
        try{
            await this.rideRepository.delete(id);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}
