import { Module } from '@nestjs/common';
import { ActTimeService } from './act-time.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ActTimeController } from './act-time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActTime } from './entity/ActTime.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ActTime])],
    providers: [ActTimeService],
    controllers: [ActTimeController],
    exports: [ActTimeService]
})
export class ActTimeModule 
{
    
}
