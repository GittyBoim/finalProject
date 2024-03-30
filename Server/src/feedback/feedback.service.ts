import { HttpException, Injectable } from '@nestjs/common';
import { Feedback } from './entity/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService 
{
    constructor( 
        @InjectRepository(Feedback)
        private feedbackRepository: Repository<Feedback>,
        ){}

    async findAll(): Promise<Feedback[]>
    { 
        try{
            return await this.feedbackRepository.find();
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
        
    }

    async findOne(id:number): Promise<Feedback| null>
    {
        try{
            return await this.feedbackRepository.findOneOrFail({where:{id}});
        }catch(err){
            throw new HttpException(err.message, err.statusR);
        }
    }

    async create({id, ...newFeedback}:Feedback):Promise<void>
    {
        try{
            await this.feedbackRepository.insert(newFeedback);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async update(id:number, feedback:Feedback):Promise<void>
    {
        try{
            await this.feedbackRepository.update(id,feedback);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async remove(id:number):Promise<void>
    {
        try{
            await this.feedbackRepository.delete(id);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}
