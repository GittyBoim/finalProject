import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/User.entity';
import { ActTime } from 'src/act-time/entity/ActTime.entity';
import { NotificationService } from 'src/notification/notification.service';


@Injectable()
export class UserService 
{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(forwardRef(() => NotificationService))
        private notificationService: NotificationService,
        ){}

    async findAll(): Promise<User[]>
    { 
        try{
            return await this.userRepository.find({ relations: ['actTimes', 'actTimes.ride'] });
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async findOne(id:number): Promise<User>
    {
        try{
            return await this.userRepository.findOneOrFail({where:{id}, relations:['actTimes', 'actTimes.ride']});
        }catch(err){
            throw new HttpException(err.message, err.status);
        }  
    }

    async findByParentId(parentId:number):Promise<User[] | null>
    {
        try{
            return await this.userRepository.find({where:{parent:{id:parentId}}, relations:['actTimes', 'actTimes.ride']});
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async create({id, ...newUser}:User):Promise<void>
    {
        const nameRegex = /^[a-zA-Z]{2,10}$/;
        const idCardRegex = /^\d{9}$/;
        const phoneRegex = /^(\d{3}-\d{7}|\d{10})$/;
        const ageRegex = /^(?:\d|[1-9]\d|1[01]\d|120)$/;
          
        try{
            if(!nameRegex.test(newUser.userName))
            throw new HttpException("Invalid user name", 409)

            if(!idCardRegex.test(newUser.idNumber))
                throw new HttpException("Invalid ID card", 409)

            if(!phoneRegex.test(newUser.phone))
                throw new HttpException("Invalid phone number", 409)
            
            if(!newUser.age || !ageRegex.test(newUser.age.toString()))
                throw new HttpException("Invalid age", 409)

                console.log(newUser);
            //newUser.idNumber=await bcrypt.hash(newUser.idNumber, 10); הצפנה

            if(newUser.parent){
                const parent = await this.userRepository.findOneByOrFail({id:newUser.parent.id});
                parent.numCards = parent.numCards -1;
                newUser.numCards = 0;
                await this.userRepository.save(parent);
            }

            await this.userRepository.insert(newUser)

        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async update(userId:number,{id, ...user}:User):Promise<void>
    {
        // if(user.idNumber)
        //     user.idNumber=await bcrypt.hash(user.idNumber, 10); הצפנה
        try{
            await this.userRepository.update(userId,user);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async remove(id:number):Promise<void>
    {
        try{
            await this.userRepository.delete(id);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }


    async findOneByIdNumber(idNumber: string):Promise<User | null>
    {
        try{
            return await this.userRepository.findOneBy({idNumber:idNumber});
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    } 

   
    async addActTime(actTime:ActTime, users:User[], parentId:number): Promise<void> {
        try{
            users =  await Promise.all(users.map( async (user:User) => {
                user = await this.userRepository.findOneOrFail({where:{id:user.id}, relations:['actTimes', 'actTimes.ride']});
                user.actTimes.push(actTime);
                return user;
            }));
            await this.userRepository.save(users);
            const tokens = (await this.userRepository.findOneOrFail({where:{id:parentId}, relations:['tokens']})).tokens;
            await this.notificationService.sendNotification(users, actTime, tokens);
        } catch (err) {
            console.log(err);
            throw new HttpException(err.message, err.status);
        }
      }


    async removeActTime(id: number, actTime: ActTime) {
        try{
            const user = await this.userRepository.findOneOrFail({where:{id}, relations:['actTimes']});
            const index = user.actTimes.findIndex((at)=> at.id == actTime.id );
            user.actTimes.splice(index, 1);
            await this.userRepository.save(user);
        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }
}
