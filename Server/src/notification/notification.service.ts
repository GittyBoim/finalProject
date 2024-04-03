import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ActTime } from 'src/act-time/entity/ActTime.entity';
import { Token } from 'src/token/entity/Token.entity';
import * as schedule from 'node-schedule';
import { cancelJob } from 'node-schedule';
import { User } from 'src/user/entity/User.entity';
import { UserService } from 'src/user/user.service';

  
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "magicparkfcm-70635",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvxGx3os6oEiNc\nvXfjLaeEVkfWPfkU6VZpf0c/AutfeTR7g9ykmtLn2IMSNAj8bQKgg/zKZLJtaOzI\nTKAouIuZZyJi+IUssyJOH5prKo73880p2BnBMtCjuRnz5Cp/NKJSW6PkjxOb1k1K\nzQC7LlFOJOhgTNhk4+lmzVQsfFrIQ0PQh+m7P5OFQYYXX+7a1oYUqQfumPerZLcx\n9tsSqkr3PDVrzHgv2dVyCwjFt3ZBdrOOJkrLux5XIv/VEIFM9FRxaO/2uC6p70/z\n65At8k2XxQYxjHA6AVI9l5ELOgwGxjRA+NOHib4h92n1F6slFqGruxh6pQrQo8Oa\nJm2Ss0P1AgMBAAECggEAAZdownRTTz6ZdwjHBysN7tk0CE8tAZDaoGMhW0pr3X0o\nSeHJtV5HDrJ0cHgksyFLGmgupCgMB4jL85pTyZN9TBdVsFC32NwKlPm5gCaRxkP1\n51Cy+o3JEJpu1jk1CYUJwot5F7IwnIobeWIvr8lLvbgdDWfxKPoHhyUJkeeLc4xk\n8sU+H9KK5egN0vNcX3Drn3BHZ5NnOv/TEuoehY3x6ZgGrb27wsX7S2A/wxkHR4OX\nLwf2dNTKj9p17+/Tn1n7415oaQn4KKIljeze3wt6Q2/F8V+NhZJquFkr/U3r1YwQ\nNJAGWqbg1jbCpVrVLFIffINFo3wFuTBnFoZG9zNqgQKBgQDrvaJyQYzs0Hw663RL\nu2q+vT4oxK2a7ljnFHyZTgZPIRdck3nl47sM0uvJEVwKm0BzfHcgHqlybgYTsR+/\nSwLGsGdZYE9J+7+8dUaeCpnXjEiBzofr8YOMwT7uLmOscUu3y+63YXptEsBVYMtm\ngMbz671X9VuesctGc5ThgcxmQQKBgQC+31roBiYnGYEHoNn6KdD9tpysLM54AgaU\nkmevdzcKWB+yPMkXYzdq0zu2APPifLtanu9n4gC/mQC7ExjatqOH8gMxic6A27BS\ncGRSEdelIXL1QoTo2Jy1K0kszrwkCZ9oUV87R0x8wsm0M/sHe1GC9PHGVH2nhHBN\nGkiFgiD4tQKBgBdkRsU9meU5vsn96RlGrI3mq09STMOt2OZ9EuwHYPrjFrVZ8OON\n2FaqazkVXuOyig+rjwqB4GB5aGL11Wee4tSiVm747oUx1NG3dV1jQeawhdVTkAsq\neNozprHtqnhG+bNwKezKYGKIVMtkAmrWZmd3wd8Deqbhj4EbIO/LeGPBAoGAK6nM\nkedWMvuSmLwjIScPt/pePMTDNpDAEJytO2Z6INOn7I4bMk5wDu/jaO8u21DNSx2w\nhoMcyLengyQLO30sS50BPgPYSYH4A+PSDzQlsJDGS3S8Esf6kTcltipUv6mz3Zk/\nv7+/r4qfualqc3uyWdLOvB/33qpdRkYM8P2jrUECgYEAjRezRv6wULjTIkOVqXIR\nq55ZKq6eBqCvFwGqh1GiEJb6FRYBoN4q1a4loz6U/18Zr7OWAdMoZ4KCz8fXIz7i\nYYa5bQqCu6Q+p0F3+Ic4XTmgq2tzOmvBgXwLOBfKcUaStIiLF2azrE8uVwBs3Bk8\nvYgGhzjiUEbVv7jYU7tX+tA=\n-----END PRIVATE KEY-----\n",
      clientEmail: "firebase-adminsdk-i3m5d@magicparkfcm-70635.iam.gserviceaccount.com",
    }),
  });


@Injectable()
export class NotificationService 
{
    constructor(
      @Inject(forwardRef(() => UserService))
      private userService: UserService,
    ){}
    
    async sendNotification(users:User[], actTime:ActTime, tokens:Token[]): Promise<void> { 
      const date = new Date();
      const [hours, minutes, seconds] = actTime.timeStart.toString().split(':').map(Number);
      date.setHours(hours);
      date.setMinutes(minutes-10);
      date.setSeconds(seconds);

      //אם התור פחות מ10 דקות לשלוח
      // const currentDate = new Date();
      // if(date > currentDate)
      //   date.setTime(currentDate.getTime());

      try{
          const job = schedule.scheduleJob(date , async () => {

            const registerUsers = await Promise.all( users.map(async (u)=> {
              const user = await this.userService.findOne(u.id);
              return user.actTimes.some(at=> at.id == actTime.id) ? u : null;
            }));

            const filteredUsers = registerUsers.filter((u): u is User  => u !== null);

            if(filteredUsers.length > 0)
            {
              const message = {
                notification:{
                  title: "hey " + users[0].userName,
                  body: filteredUsers.map((u) => u.userName).join(" ") +" have a "+actTime.ride.rideName+" appointment in 10 minutes",
                },
                token: tokens[0].token,
              };
              const response =  await admin.messaging().send(message);
            }

          });
      }catch(err){
        throw new HttpException(err.message, 400);
      }

    }


    async cancelMessgae(messageId: string | schedule.Job){
      try{
        cancelJob(messageId);
      }catch(err){
        console.log(err);
      }

    }
}

