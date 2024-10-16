import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequest, FriendRequestSchema } from './schemas/friend-request.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{ name: FriendRequest.name, schema: FriendRequestSchema }])
  ],
  providers: [FriendRequestService],
  controllers: [FriendRequestController],
  exports:[FriendRequestService]//
})
export class FriendRequestModule {}
