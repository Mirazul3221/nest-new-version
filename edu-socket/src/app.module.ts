import { Module } from '@nestjs/common';
import { SocketServerModule } from './socket-server/socket-server.module';
import { ConfigModule } from '@nestjs/config';
import { PushNotificationModule } from './push_notification/push_notification.module';

@Module({
  imports: [SocketServerModule,ConfigModule.forRoot({
      isGlobal: true, // makes it accessible in all modules
    }), PushNotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
