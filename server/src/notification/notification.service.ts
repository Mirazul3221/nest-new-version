import { Injectable } from '@nestjs/common';
// import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, notification_model } from './schemas/notification.schema';
import mongoose, { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { FriendRequestService } from 'src/friend-request/friend-request.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(notification_model) private readonly notificationModel : Model<Notification>,
    private readonly readerService:AuthService,private readonly friendRequsetService:FriendRequestService
  ){}
 async create(info:any, body:any) {
    let schema = {}
    //===========================================================================================
    if (body.type === "friend-request") {
      const allUserDetails = await this.readerService.findAllUserForRequestedFriend(info.user.id)
      schema = {
        readerId:body.readerId,
        type:body.type,
        message:{
          requesterId:allUserDetails[0]._id,
          requesterName:allUserDetails[0].name,
          requesterProfie:allUserDetails[0].profile,
          requesterStatus:allUserDetails[0].status,
        },
        seen:false
      }
    }
    //===============================================================================================
    if (body.type === "accept-request") {
      const allUserDetails = await this.readerService.findAllUserForRequestedFriend(info.user.id)
      schema = {
        readerId:body.readerId,
        type:body.type,
        message:{
          requesterName:allUserDetails[0].name,
          requesterProfie:allUserDetails[0].profile
        },
        seen:false
      }
    }
    //================================================================================================
    if (body.type === "invite-friend") {
      const allUserDetails = await this.readerService.findAllUserForRequestedFriend(info.user.id)
      const myFriendDetails = await this.readerService.findAllUserForRequestedFriend(body.readerId)
      schema = {
        readerId:body.readerId,
        type:body.type,
        message:{
          requesterId : allUserDetails[0]._id,
          requesterName:allUserDetails[0].name,
          requesterProfie:allUserDetails[0].profile,
          requesterStatus:allUserDetails[0].status,
          friendName:myFriendDetails[0].name,
          friendProfie:myFriendDetails[0].profile,
        },
        seen:false
      }
    }
    //======================================================================================================
    if (body.type === "respond-from-invitation") {
      const allUserDetails = await this.readerService.findAllUserForRequestedFriend(info.user.id);
      const friend = await this.readerService.findAllUserForRequestedFriend(body.readerId)
      schema = {
        readerId:body.readerId,
        type:body.type,
        message:{
          requesterName:allUserDetails[0].name,
          responderName:friend[0].name,
          requesterProfie:allUserDetails[0].profile,
          requesterStatus:allUserDetails[0].status,
        },
        seen:false
      }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (body.type === 'like-question') {
      const allUserDetails = await this.readerService.findAllUserForRequestedFriend(info.user.id);
      schema = {
        readerId:body.readerId,
        type:body.type,
        message:{
          requesterName:allUserDetails[0].name,
          requesterProfile:allUserDetails[0].profile,
          question:body.question,
          slug:body.slug
        },
        seen:false
      }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (body.type === 'comment-question') {
      const allUserDetails = await this.readerService.findAllUserForRequestedFriend(info.user.id);
      schema = {
        readerId:body.readerId,
        type:body.type,
        message:{
          requesterName:allUserDetails[0].name,
          requesterProfile:allUserDetails[0].profile,
          question:body.question,
          Comment:body.comment,
          slug:body.slug
        },
        seen:false
      }
    }
   const sendNotification =await new this.notificationModel(schema)
   await sendNotification.save()

  ///////////////////////delete notification more than twenty//////////////////////////
  const notificationCount = await this.notificationModel.countDocuments({readerId:body.readerId})
   if (notificationCount > 30) {
     const excessNotification = await this.notificationModel.find({readerId:body.readerId}).sort({createdAt:1}).limit(notificationCount-30);
     const excessIds = excessNotification.map((notif)=>notif._id)
      await this.notificationModel.deleteMany({
        _id : { $in : excessIds }
      });
   }
  }

 async findAll(id) {

    const notification = await this.notificationModel.find({readerId:id}).sort({createdAt : -1})
    return await notification
   
  }

  //================================================================
  //=======================Seen and delete==========================
   //===============================================================
  async seenAllAndDelete(id){
        await this.notificationModel.updateMany({readerId:id},{$set : {seen : true}})
        const allNotif = await this.notificationModel.find({readerId : id}).sort({createdAt : -1})
        const notifIndex = allNotif?.length
        let deletableId = []
        if (notifIndex > 30) {
          for (let i = 0; i < notifIndex-30; i++) {
          const id =await allNotif[20 + i]?._id
         await deletableId.push(id)
          }
        const del =  await this.notificationModel.deleteMany({_id:deletableId})
        }
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

 async deleteOne(id,requesterName) {
   const deldete = await this.notificationModel.deleteOne({"readerId":id,"type":"friend-request","message.requesterName":requesterName})
    return `This action removes`;////
  }
 async deleteMany() {
    const deleteNotif =await this.notificationModel.deleteMany({readerId:'66a688a44470899263f464ed'})
    return `This action removes`;
  }

  //=========================Service outside of the function============================
  async getAllNotificationForOutService(id) {
    const yyy =  await this.notificationModel.find({readerId:id,seen:false})
    console.log(yyy)
  }
  async putNotificationToAllFriends(topic:any,user:any) {
    const friendId =await this.friendRequsetService.allAcceptedUsersId(user._id)
    const allSchemas = []
     friendId?.map((item)=>{
    const schema = {
        readerId:item,
        type:'reading-notification',
        message:{
          requesterName:user.name,
          requesterProfie:user.profile,
          requesterStatus:user.status,
          topic:topic
        },
        seen:false
      }
      allSchemas.push(schema)
     })

     await this.notificationModel.insertMany(allSchemas,{ ordered: true })
  }
}
