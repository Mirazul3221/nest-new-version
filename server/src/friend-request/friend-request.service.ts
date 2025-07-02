import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { FriendRequest, FriendRequestDocument } from './schemas/friend-request.schema';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { RespondFriendRequestDto } from './dto/respond-friend-request.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequestDocument>,
    private authService:AuthService
  ) {}
  async create(requesterId: string, createFriendRequestDto: CreateFriendRequestDto) {
    // console.log(requesterId)
    const hasFriend = await this.friendRequestModel.findOne(
      {
        requester: requesterId,
        recipient: createFriendRequestDto.id,
      }
    )
    if (!hasFriend) {
      const friendRequest =await new this.friendRequestModel({
        requester: requesterId,
        recipient: createFriendRequestDto.id,
      });
      friendRequest.save();
    } else {
      return "Not found"
    }
    // console.log(requesterId)
    // console.log('brek')
  //  console.log(new mongoose.mongo.ObjectId(requesterId) === new mongoose.mongo.ObjectId(hasFriend.requester))
  //   console.log(hasFriend.requester)
  //   console.log(requesterId)
  //   console.log('brek')

    // console.log(hasFriend.recipient)
    // console.log(createFriendRequestDto.recipient)
    // console.log(hasFriend.recipient === createFriendRequestDto.recipient)
  //  const validator = (hasFriend.requester === requesterId)
  //  console.log(validator)

    // if (hasFriend) {
    //   const friendRequest =await new this.friendRequestModel({
    //     requester: requesterId,
    //     recipient: createFriendRequestDto.recipient,
    //   });
    //   friendRequest.save();
    // }
  }
//
 async cancel(requesterId: string, recipientId: any) {
     await this.friendRequestModel.deleteOne({
      requester: new mongoose.mongo.ObjectId( requesterId),
      recipient: new mongoose.mongo.ObjectId( recipientId),
    }).exec();

     await this.friendRequestModel.deleteOne({
      requester: new mongoose.mongo.ObjectId( recipientId),
      recipient: new mongoose.mongo.ObjectId( requesterId),
    }).exec();
  }
 async checkStatus(requesterId: string, recipientId: any) {
  const friendRequest = await this.friendRequestModel.findOne({
    $or: [
      { requester: new mongoose.mongo.ObjectId(requesterId), recipient: new mongoose.mongo.ObjectId(recipientId) },
      { requester: new mongoose.mongo.ObjectId(recipientId), recipient: new mongoose.mongo.ObjectId(requesterId) }
    ]
  }).select('status'); // Select only the 'status' field for efficiency
  if (!friendRequest) {
    return "empty"; // No document found
  }
  
  return friendRequest.status; // Return "pending" or "accepted"
  
  }

  async respond(recipientId: string, requestId: string, respondFriendRequestDto: RespondFriendRequestDto): Promise<FriendRequest> {
    const friendRequest = await this.friendRequestModel.findOne({    
      requester:new mongoose.mongo.ObjectId(requestId),
      recipient: new mongoose.mongo.ObjectId(recipientId),
      status: 'pending',
    });

    if (!friendRequest) {
      throw new Error('Friend request not found');
    }

    friendRequest.status = 'accepted';
    return friendRequest.save();
  }

  async myFriends(userId: string, status:string) {

    // 1. Get all accepted friend requests of current user
    const friendRequests = await this.friendRequestModel
      .find({
        status: 'accepted',
        $or: [{ requester: userId }, { recipient: userId }],
      })
      .select('requester recipient')
      .lean();

    // 2. Extract direct friends' IDs
    const directFriendIds = [
      ...new Set(
        friendRequests
          .flatMap(({ requester, recipient }) => [
            requester.toString(),
            recipient.toString(),
          ])
          .filter((id) => id !== userId.toString()),
      ),
    ];
    // 3. Get recent connections of all direct friends (second-degree)
const objectIds = directFriendIds.map(id => new Types.ObjectId(id));
    const FriendsFromRequester =await this.friendRequestModel.find({
      requester: userId,
    }).exec();
    const FriendsFromReceiver =await this.friendRequestModel.find({
      recipient: userId,
    }).exec();
    // const allFriendRequest = [...FriendsFromRequester,...FriendsFromReceiver]
    // console.log(allFriendRequest)
    //==========================================================================
    //===============All Accecpted friends logic================================
   const allAcceptedUsersId = [];
   FriendsFromRequester.filter((item)=>item.status === "accepted").map((item)=>{
    allAcceptedUsersId.push(item.recipient)
   })
   FriendsFromReceiver.filter((item)=>item.status === "accepted").map((item)=>{
    allAcceptedUsersId.push(item.requester)
   })

       //==========================================================================
    //===============All pending friends logic=====================================
    const pendingFriends = []
    FriendsFromReceiver.filter((item)=>item.status === "pending").map((item)=>{
      pendingFriends.push(item.requester)
     })
    //  console.log(pendingFriends)

   if (status === "accepted") {
    const allAcceptedFriend =await this.authService.findAllUserForRequestedFriend(objectIds)
   return await allAcceptedFriend
   }

   if (status === "pending") {
     // 1. Get all accepted friend requests of current user
    const friendRequests = await this.friendRequestModel
      .find({
        status: 'pending',
        $or: [{ recipient: userId }],
      })
      .select('requester recipient status')
      .lean();
    // 2. Extract direct friends' IDs
    const directFriendIds = [
      ...new Set(
        friendRequests
          .flatMap(({ requester, recipient }) => [
            requester.toString(),
            recipient.toString(),
          ])
          .filter((id) => id !== userId.toString()),
      ),
    ];
    // 3. Get recent connections of all direct friends (second-degree)
const obj = directFriendIds.map(id => new Types.ObjectId(id));
    const allPendingFriend =await this.authService.findAllUserForRequestedFriend(obj)
   return await allPendingFriend
   }
   if (status === "acceptedFriendId") {
   return await objectIds
   }
   if (status === "someAcceptedFriendProfileAndAllIds") {
   const someProfile = await this.authService.findAllUserForRequestedFriend(allAcceptedUsersId)
   }
  }
//========================================================================================
  async yourFriends(yourId:string,yourStatus:string){

    const getRequesterAndReceiverId =async ()=>{
      const FriendsFromRequester =await this.friendRequestModel.find({
        requester: new mongoose.mongo.ObjectId(yourId), status : "accepted"
      }).exec();
      const FriendsFromReceiver =await this.friendRequestModel.find({
        recipient: new mongoose.mongo.ObjectId(yourId), status : "accepted"
      }).exec();
      //==========================================================================
      //===============All Accecpted friends logic================================
     const allAcceptedUsersId = [];
     FriendsFromRequester.map((item)=>{
      allAcceptedUsersId.push(item.recipient)
     })
     FriendsFromReceiver.map((item)=>{
      allAcceptedUsersId.push(item.requester)
     })

     return await allAcceptedUsersId
    }


   if (yourStatus === "somefriendandid") {
        const allusers =await  getRequesterAndReceiverId();
          const allAcceptedFriend =await this.authService.findAllUserForRequestedFriend(allusers)
    if (allAcceptedFriend.length > 2) {
      let friendsProfile = []
      friendsProfile.push({profile:allAcceptedFriend[0]?.profile});
      friendsProfile.push({profile:allAcceptedFriend[1]?.profile});
      friendsProfile.push({profile:allAcceptedFriend[2]?.profile});
      return await {
        profile:friendsProfile,
        totalUsers : allAcceptedFriend.length
      }
    }
   return await allAcceptedFriend //
   }
   if (yourStatus === "somefriend") {
    const allusers =await  getRequesterAndReceiverId();
    const allAcceptedFriend =await this.authService.findAllUserForRequestedFriend(allusers)
    if (allAcceptedFriend.length < 10) {
        return await allAcceptedFriend;
    }
    if (allAcceptedFriend.length > 10) {
      for (let i = 0; i < allAcceptedFriend.length - (allAcceptedFriend.length - 10); i++) {
          const filterFriend = [];
          filterFriend.push(allAcceptedFriend[i])
      }
    }
   }
  }

  //====================================Get Id Outside of This Controller=====================================
  async allAcceptedUsersId(yourId){
      const FriendsFromRequester =await this.friendRequestModel.find({
        requester: new mongoose.mongo.ObjectId(yourId), status : "accepted"
      }).exec();
      const FriendsFromReceiver =await this.friendRequestModel.find({
        recipient: new mongoose.mongo.ObjectId(yourId), status : "accepted"
      }).exec();
      //==========================================================================
      //===============All Accecpted friends logic================================
     const allAcceptedUsersId = [];
     FriendsFromRequester.map((item)=>{
      allAcceptedUsersId.push(item.recipient)
     })
     FriendsFromReceiver.map((item)=>{
      allAcceptedUsersId.push(item.requester)
     })

     return await allAcceptedUsersId
  }

  /////////////////////////////////////////////////
  async allFriendsIdSendReqByMe(id,status){
    const result = []
    const ids = await this.friendRequestModel.find({
       requester: new mongoose.mongo.ObjectId(id), status : status
    })
    ids.map(user=>{
       result.push(user.recipient)
    })
     return result
  }
}
