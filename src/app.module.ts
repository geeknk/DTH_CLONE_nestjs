import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './enitites/user.entities';
import { Channel } from './enitites/channel.entity';
import { Subscription } from './enitites/subscription.entity';
import { Plan } from './enitites/plan.entity';
import { verifyToken, loginMiddileware } from './middleware/auth';
import { PlansController } from './plans/plans.controller';
import { PlansService } from './plans/plans.service';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsService } from './channels/channels.service';
import { config } from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [User,Channel,Subscription,Plan],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User,Channel,Subscription,Plan])
  ],
  controllers: [UsersController, PlansController, ChannelsController],
  providers: [UsersService, PlansService, ChannelsService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyToken)
    .exclude(
      { path: 'users/login', method: RequestMethod.POST },
      { path: 'users/register', method: RequestMethod.POST },
    )
    .forRoutes(
      PlansController,
      ChannelsController,
      UsersController
    )

    consumer.apply(loginMiddileware)
    .forRoutes({
      path: 'users/login', method: RequestMethod.POST
    })
  }
  
}
