import { Body, Controller, Get, Param, UseGuards, Post, Patch, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entity/feedback.entity';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('feedback')
export class FeedbackController 
{
    constructor(private feedbackService:FeedbackService){}
    
    @Get()
    async findAll():Promise<Feedback[]>
    {
        return await this.feedbackService.findAll();
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Feedback |null>
    {
        return await this.feedbackService.findOne(id);
    }

    @Post()
    async create(@Body() newRide:Feedback):Promise<void>
    {
        await this.feedbackService.create(newRide);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(RolesGuard)
    @Patch(':id')
    async update(@Param('id') id:number, @Body() ride:Feedback):Promise<void>
    {
        await this.feedbackService.update(id, ride);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete(':id')
    async remove(@Param('id') id:number):Promise<void>
    {
        await this.feedbackService.remove(id);
    }
}
