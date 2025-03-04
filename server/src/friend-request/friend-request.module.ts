import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequest, FriendRequestSchema } from './schemas/friend-request.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FriendRequest.name, schema: FriendRequestSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [FriendRequestService],
  controllers: [FriendRequestController],
  exports:[FriendRequestService,
    MongooseModule.forFeature([{ name: FriendRequest.name, schema: FriendRequestSchema }])
  ]//
})
export class FriendRequestModule {}
