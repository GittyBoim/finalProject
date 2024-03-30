import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActTime } from 'src/act-time/entity/ActTime.entity';
import { Feedback } from 'src/feedback/entity/feedback.entity';
import { Ride } from 'src/ride/entity/Ride.entity';
import { Token } from 'src/token/entity/Token.entity';
import { User } from 'src/user/entity/User.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: '127.0.0.1',
          port: 3306,
          username: 'gitty',
          password: '0556705220',
          database: 'luna_park_db',
          entities: [User, Ride, ActTime, Token, Feedback],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Ride, ActTime, Token, Feedback])
      ],
      exports:[TypeOrmModule]
})
export class DbModule {}
