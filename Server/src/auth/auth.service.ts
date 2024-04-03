import { HttpException, HttpStatus, Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/User.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class AuthService 
{
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) {}

    async signIn(userName: string, idNumber: string)
    {
        try{
            // this.notificationService.sendNotification();
            const user=await this.userService.findOneByIdNumber(idNumber);
            // if(!user || !(await bcrypt.compare(idNumber, user.idNumber))) הצפנה
            if(!user || user.userName != userName)
            {
                throw new UnauthorizedException();
            }
            
            const payload = { id: user.id, role:user.role};

            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        }catch(err){
            throw new HttpException(err.message, err.status);
        }
    }

    async signUp(newUser:User)
    {
        try{
            const idNumber = newUser.idNumber;
            await this.userService.create(newUser);
            return await this.signIn(newUser.userName, idNumber);
        }catch(err){
            throw new HttpException(err.message, 409);
        }

    }

    //לילדים אני לא ורצה שיחזור טוקן ולכן כדאי לעשות קריאה נוספת לisgnUpChildren 
    //צריך גם לבדוק את ה phone 
    //ואם זה קריאה גם לילד אי אפשר כי לילד אין פון ולכן בינתיים הסלשת
    //הוספתי לילד את הטלפון של האבא והורדתי את ההסלשה 
}
