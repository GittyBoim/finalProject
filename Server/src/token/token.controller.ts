import { Body, Controller, Get, Param, UseGuards, Post, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TokenService } from './token.service';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Token } from './entity/Token.entity';
import { UserId } from 'src/decorators/userId.decorator';


@UseGuards(AuthGuard)
@Controller('token')
export class TokenController
{
    constructor(private tokenService:TokenService){}

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get()
    async findAll():Promise<Token[]>
    {
        return await this.tokenService.findAll();
    }
    
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Token |null>
    {
        return await this.tokenService.findOne(id);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() token:Token):Promise<void>
    {
        await this.tokenService.create(token) ;
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Patch(':id')
    async update(@Param('id') id:number, @Body() token:Token):Promise<void>
    {
        await this.tokenService.update(id, token);
    }
    
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(':id')
    async remove(@Param('id') id:number):Promise<void>
    {
        await this.tokenService.remove(id);
    }

}

