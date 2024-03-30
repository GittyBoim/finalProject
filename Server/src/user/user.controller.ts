import { Body, Controller, Delete, Get, Param, Post, UseGuards, Patch, HttpException} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/entity/User.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserId } from 'src/decorators/userId.decorator';
import { ActTime } from 'src/act-time/entity/ActTime.entity';


@UseGuards(AuthGuard)
@Controller('user')
export class UserController {

    constructor(private userService:UserService){}
    
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get()
    async findAll():Promise<User[]>
    {
        return await this.userService.findAll();
    }
    
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get(':id')
    async findOne(@UserId() id:number):Promise<User |null>
    {
        return await this.userService.findOne(id);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get('getByParentId/:id')
    async findByParentId(@UserId() id:number):Promise<User[] | null>
    {
        return await this.userService.findByParentId(id);
    }
    
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() newUser:User):Promise<void>
    {
        await this.userService.create(newUser);  
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Patch(':id')
    async update(@UserId() id:number, @Body() user:User):Promise<void>
    {
        await this.userService.update(id, user);
    }
    
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Delete(':id')
    async remove(@UserId() id:number):Promise<void>
    {
        await this.userService.remove(id);
    }

    //זה בסדר לקבל מערך של משתמשים?
    //לבדוק שזה עושה את זה בטרנזקציה
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Post('addActTime/:id')
    async addActTime(@UserId() id:number, @Body() {actTime, users}: {actTime:ActTime, users:User[]}):Promise<void>
    { 
        await this.userService.addActTime(actTime, users, id);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Delete('deleteActTime/:id')
    async removeActTime(@Param('id') id:number, @Body() actTime:ActTime):Promise<void>
    {
        await this.userService.removeActTime(id, actTime);
    }
    
}




