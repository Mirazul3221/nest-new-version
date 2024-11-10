import { Injectable } from '@nestjs/common';
import { CreateMessangerDto } from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Messanger, messangerModel } from './schema/messanger.schema';
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MessangerService {
 
  constructor(
    @InjectModel(messangerModel)
    private MessangerModel : mongoose.Model<Messanger>,
    private readonly authService : AuthService
  ){}

  async create(createMessangerDto:CreateMessangerDto,id) {
     await this.MessangerModel.create({
      senderId:id,
      receiverId:createMessangerDto.receiverId,
      message:createMessangerDto.message,
      seenMessage:false
     })
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

 async findMyFriendAllMessage(user,id) {
  const allMessage = await this.MessangerModel.find({
    $or : [
      {senderId:user._id,receiverId:id},
      {senderId:id,receiverId:user._id}
    ]
  })
    return await allMessage;
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