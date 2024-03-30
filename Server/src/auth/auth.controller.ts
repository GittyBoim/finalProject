import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entity/User.entity';

@Controller('auth')
export class AuthController 
{
    constructor(
        private authService:AuthService,
    ){}

    @Post('signin')
    async signIn(@Body() signInDto: Record<string, any>)
    {
        return await this.authService.signIn(signInDto.userName, signInDto.idNumber);
    }

    @Post('signup')
    async signUp(@Body() newUser:User)
    {
        return await this.authService.signUp(newUser);
    }
}
