import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { notification_model, notification_schema } from './schemas/notification.schema';
import { FriendRequestModule } from 'src/friend-request/friend-request.module';

@Module({
  imports:[AuthModule,FriendRequestModule,
    MongooseModule.forFeature([
      {
        name: notification_model,
        schema: notification_schema,
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports:[NotificationService]
})
export class NotificationModule {}
