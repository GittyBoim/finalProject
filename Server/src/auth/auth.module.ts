import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { NotificationModule } from 'src/notification/notification.module';


@Module({
  imports: [
    UserModule,
    NotificationModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
