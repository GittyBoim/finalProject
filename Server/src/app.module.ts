import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { RideModule } from './ride/ride.module';
import { AuthModule } from './auth/auth.module';
import { ActTimeModule } from './act-time/act-time.module';
import { RolesGuard } from './roles/roles.guard';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackModule } from './feedback/feedback.module';


@Module({
  imports: [DbModule, UserModule, RideModule, AuthModule, ActTimeModule, NotificationModule, TokenModule, FeedbackModule],
  controllers: [AppController],
  providers: [AppService, RolesGuard, NotificationService, TokenService, FeedbackService],
})
export class AppModule {}
