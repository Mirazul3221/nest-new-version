import { Module } from '@nestjs/common';
import { PushNotificationService } from './push_notification.service';
import { PushNotificationController } from './push_notification.controller';

@Module({
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
})
export class PushNotificationModule {}
