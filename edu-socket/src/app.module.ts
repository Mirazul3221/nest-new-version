import { Module } from '@nestjs/common';
import { SocketServerModule } from './socket-server/socket-server.module';
import { ConfigModule } from '@nestjs/config';
import { PushNotificationModule } from './push_notification/push_notification.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [SocketServerModule,ConfigModule.forRoot({
      isGlobal: true, // makes it accessible in all modules
    }),
        // Secondary MongoDB connection (AnotherDB)
    MongooseModule.forRoot('mongodb+srv://toriq:yfxeikTooqKHqLFd@cluster0.dtsbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      dbName: 'pushConnection',
    }), PushNotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
