import { Injectable } from '@nestjs/common';
import { CreateImageMessangerDto, CreateMessangerDto, CreateVoiceMessageDto } from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Messanger, messangerModel } from './schema/messanger.schema';
import mongoose, { Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import {v2 as cloudinary} from 'cloudinary'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessangerService {
 
  constructor(
    @InjectModel(messangerModel)
    private MessangerModel : mongoose.Model<Messanger>,
    private readonly authService : AuthService,
    private readonly ConfigService: ConfigService
  ){}

  async createTextMessage(createMessangerDto:CreateMessangerDto,id) {
    const created =  await this.MessangerModel.create({
      senderId:id,
      receiverId:createMessangerDto.receiverId,
      message:{content:createMessangerDto.message,media:'',voice:''},
      reply:createMessangerDto.reply,
      seenMessage:false
     })
     return created
  }


  async createImageMessage(createMessage:CreateImageMessangerDto,id) {
    const {receiverId,image,reply} = createMessage
    const replyAsArray = JSON.parse(reply)
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret')
    })
    const data = await cloudinary.uploader.upload(image.path,{
      folder: 'image_message', // Specify the folder in Cloudinary
      resource_type: 'auto', // Automatically detect the file type (audio in this case)
    })
    const created =  await this.MessangerModel.create({
      senderId:id,
      receiverId:receiverId,
      message:{content:'',media:data.secure_url,voice:''},
      reply:replyAsArray,
      seenMessage:false
     })
     return created
  }
  async createVoiceMessage(createMessage:CreateVoiceMessageDto,id) {
  const {receiverId,voice,reply} = createMessage;
  const replyAsArray = JSON.parse(reply)
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret')
    })
    const data = await cloudinary.uploader.upload(voice.path, {
      folder: 'voice_message', // Specify the folder in Cloudinary
      resource_type: 'auto', // Automatically detect the file type (audio in this case)
    });
    
    const created = await this.MessangerModel.create({
      senderId: id,
      receiverId: receiverId,
      message: {
        content: '',
        media: '', // Use the secure_url from Cloudinary for HTTPS
        voice: data.secure_url,
      },
      reply: replyAsArray,
      seenMessage: false,
    });
    
     return created
  }

  async updateMessageSeenStatus(friendId, myId) {
    await this.MessangerModel.updateMany(
        {
            senderId: friendId,
            receiverId: myId,
            seenMessage: false
        },
        { $set: { seenMessage: true } }
    );
}


async unSeenMessageCount(myId){
 const msg =  await this.MessangerModel.find({
    receiverId: myId,
    seenMessage: false
})


return msg.length
}

  async getCombinedLastMessageAndUserProfiles (myId){
    const allMessage = await this.MessangerModel.find({
      $or : [
        {senderId:myId},
        {receiverId:myId}
      ]
    });
    const myObjectId = new Types.ObjectId(myId)
    
    const result = await this.MessangerModel.aggregate([
      {
        $match: {
          $or: [
            { senderId: myObjectId },
            { receiverId: myObjectId }
          ]
        }
      },
      {
        $project: {
          otherUserId: {
            $cond: {
              if: { $eq: ['$senderId', myObjectId] },
              then: '$receiverId',
              else: '$senderId'
            }
          },
          senderId: 1,
          receiverId: 1,
          message: 1,
          messageTime: '$createdAt',
          seenMessage: 1
        }
      },
      {
        $sort: {
          messageTime: -1
        }
      },
      {
        $group: {
          _id: '$otherUserId',
          senderId: { $first: '$senderId' },
          lastMessage: { $first: '$message' },
          lastMessageTime: { $first: '$messageTime' },
          unseenMessageCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$seenMessage', false] },  // Unseen messages
                    { $ne: ['$senderId', myObjectId] } // Sent by the friend
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'readers',
          localField: '_id',
          foreignField: '_id',
          as: 'userProfile'
        }
      },
      {
        $unwind: '$userProfile'
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$userProfile.name',
          userProfile: '$userProfile.profile',
          senderId: 1,
          lastMessage: 1,
          lastMessageTime: 1,
          unseenMessageCount: 1
        }
      }
    ]);
    return result;
    
  }

  async findAllFriendsByMessages (myId){
    const allMessage = await this.MessangerModel.find({
      $or : [
        {senderId:myId},
        {receiverId:myId}
      ]
    })
   
    const uniqueIds = new Set <string>()
    allMessage.forEach((question)=>{
      uniqueIds.add(question.senderId.toString())
      uniqueIds.add(question.receiverId.toString())
    })
     const getAll = Array.from(uniqueIds)
    const allFriends = await this.authService.findAllUserForRequestedFriend(getAll)
    return await allFriends
  }

  async updateEmojiInMessanger(message){
    const {questionId,senderId,senderName,senderProfile,emoji} = message
   const targetMessage = await this.MessangerModel.findById(questionId);
   const senderIds = targetMessage?.emoji?.map(m => m.senderId)
   const checkDuplicate = senderIds?.includes(senderId)
if (!checkDuplicate) {
  targetMessage.emoji.push({senderId,senderName,senderProfile,emoji})
} else {
    // Update existing emoji object if senderId is already present
    const index = targetMessage.emoji.findIndex((em) => em.senderId == senderId);
    if (index !== -1) {
      targetMessage.emoji[index].emoji = emoji;
      // Mark the specific array element as modified
      targetMessage.markModified(`emoji.${index}`);
    }
}
   await targetMessage.save()
  }//

 async findMyFriendAllMessage(user,id,page) {
  const allMessage = await this.MessangerModel.find({
    $or : [
      {senderId:user._id,receiverId:id},
      {senderId:id,receiverId:user._id}
    ]
  }).sort({createdAt:-1})
    return await allMessage;
  }


  async findMessagesWithPagination(
    userId: string,
    friendId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const skip = (page - 1) * limit;
  
    const messages = await this.MessangerModel.find({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    })
      .sort({ createdAt: -1 }) // Fetch latest messages first
      .skip(skip)
      .limit(limit);
    console.log(page)
    return messages.reverse();
  }

  findOne(id: number) {
    return `This action returns a #${id} messanger`;
  }

  update(id: number, updateMessangerDto: UpdateMessangerDto) {
    return `This action updates a #${id} messanger`;
  }

  remove(id: number) {
    return `This action removes a #${id} messanger`;
  }
}//