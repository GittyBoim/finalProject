import { Module, forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/User.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from 'src/roles/roles.guard';
import { NotificationModule } from 'src/notification/notification.module';

@Module({

    imports: [TypeOrmModule.forFeature([User]),  forwardRef(() => NotificationModule)],
    providers: [UserService,RolesGuard],
    controllers: [UserController],
    exports: [UserService]
    
})
export class UserModule {}
