import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { Ride } from 'src/ride/entity/Ride.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';


@Controller('ride')
export class RideController 
{
    constructor(private rideService:RideService){}
    
    @Get()
    async findAll():Promise<Ride[]>
    {
        return await this.rideService.findAll();
    }
    
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Ride |null>
    {
        return await this.rideService.findOne(id);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() newRide:Ride):Promise<void>
    {
        await this.rideService.create(newRide);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id:number, @Body() ride:Ride):Promise<void>
    {
        await this.rideService.update(id, ride);
    }
    
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id:number):Promise<void>
    {
        await this.rideService.remove(id);
    }
 
}
