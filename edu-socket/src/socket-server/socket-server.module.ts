import { Module } from '@nestjs/common';
import { NotificationsGateway } from './socket-server.gateway';

@Module({
  providers: [NotificationsGateway],
})
export class SocketServerModule {}
