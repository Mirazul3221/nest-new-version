import { Injectable } from '@nestjs/common';
import { CreateMessangerDto } from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Messanger, messangerModel } from './schema/messanger.schema';
import mongoose from 'mongoose';

@Injectable()
export class MessangerService {
 
  constructor(
    @InjectModel(messangerModel)
    private MessangerModel : mongoose.Model<Messanger>
  ){}

  async create(createMessangerDto:CreateMessangerDto,id) {
     await this.MessangerModel.create({
      senderId:id,
      receiverId:createMessangerDto.receiverId,
      message:createMessangerDto.message,
      seenMessage:false
     })
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