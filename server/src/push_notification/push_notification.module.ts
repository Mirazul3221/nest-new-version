import { Module } from '@nestjs/common';
import { PushNotificationService } from './push_notification.service';
import { PushNotificationController } from './push_notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationRecord, subKeySchema } from './schema/subscriptionSchema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: NotificationRecord.name, schema: subKeySchema }],'pushConnection')
  ],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  exports:[PushNotificationService]
})
export class PushNotificationModule {}
