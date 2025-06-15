import { Module } from '@nestjs/common';
import { UsermemoryService } from './usermemory.service';
import { UsermemoryController } from './usermemory.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MongooseModule } from '@nestjs/mongoose';
import { memorySchema, UserMemory } from './schema/memorySchema';
import { PushNotificationModule } from 'src/push_notification/push_notification.module';
import { NotificationRecord, subKeySchema } from 'src/push_notification/schema/subscriptionSchema';

@Module({
  imports:
  [AuthModule,PushNotificationModule,NestjsFormDataModule, MongooseModule.forFeature([{ name: UserMemory.name, schema: memorySchema }]),
MongooseModule.forFeature(
  [{ name: NotificationRecord.name, schema: subKeySchema }],
  'pushConnection', // <-- your custom connection name
)
],
  controllers: [UsermemoryController],
  providers: [UsermemoryService],
})
export class UsermemoryModule {}
