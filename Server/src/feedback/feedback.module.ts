import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entity/feedback.entity';
import { FeedbackService } from './feedback.service';
import { RolesGuard } from 'src/roles/roles.guard';


@Module({

  imports: [TypeOrmModule.forFeature([Feedback])],
  providers: [FeedbackService, RolesGuard],
  controllers: [FeedbackController],
  exports: [FeedbackService]
  
})
export class FeedbackModule {}