import { Module } from '@nestjs/common';
import { SocketServerModule } from './socket-server/socket-server.module';

@Module({
  imports: [SocketServerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
