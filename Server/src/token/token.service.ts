import { HttpException, Injectable } from '@nestjs/common';
import { Token } from './entity/Token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService 
{
    constructor( 
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>,
        ){}
    
    async findAll(): Promise<Token[]>
    { 
        try{
            return await this.tokenRepository.find({});
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async findOne(id:number): Promise<Token | null>
    {
        try{
            return await this.tokenRepository.findOneOrFail({where:{id}});
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
            
    }

    async create(token:Token):Promise<void>
    {
        try{
            await this.tokenRepository.upsert([token], ['deviceId','user'])
            //לבדוק שאם user //אחר לאותו מכשיר מוסיף ולא מחליף למשתמש האחר// סידרתי לוודא שעובד
        }catch(err){
            throw new HttpException(err.message, err.status);
        }

    }

    async update(id:number, token:Token):Promise<void>
    {
        try{
            await this.tokenRepository.update(id,token);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async remove(id:number):Promise<void>
    {
        try{
            await this.tokenRepository.delete(id);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
    
}
