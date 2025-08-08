import { Module } from '@nestjs/common';
import { NotificationsGateway } from './socket-server.gateway';
import { PushNotificationModule } from 'src/push_notification/push_notification.module';

@Module({
  imports:[PushNotificationModule],
  providers: [NotificationsGateway],
})
export class SocketServerModule {}
