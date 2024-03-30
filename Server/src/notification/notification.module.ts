import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [ forwardRef(() => UserModule)],
    providers: [NotificationService],
    exports: [NotificationService]
})

export class NotificationModule {}
