import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActTimeService } from './act-time.service';
import { ActTime } from './entity/ActTime.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';


@Controller('act-time')
export class ActTimeController 
{
    constructor(private actTimeService:ActTimeService){}

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Get()
    async findAll():Promise<ActTime[]>
    {
        return await this.actTimeService.findAll();
    }
    
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id:number):Promise<ActTime |null>
    {
        return await this.actTimeService.findOne(id);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() actTime:ActTime):Promise<void>
    {
        await this.actTimeService.create(actTime);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id:number, @Body() actTime:ActTime):Promise<void>
    {
        await this.actTimeService.update(id, actTime);
    }
    
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id:number):Promise<void>
    {
        await this.actTimeService.remove(id);
    }

    @Get('getByRideId/:id')
    async getByRideId(@Param('id') rideId:number):Promise<ActTime[]>
    {
        return await this.actTimeService.getByRideId(rideId);
    }
}
