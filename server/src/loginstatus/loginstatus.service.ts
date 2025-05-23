import { Injectable } from '@nestjs/common';
import { CreateLoginstatusDto } from './dto/create-loginstatus.dto';
import { UpdateLoginstatusDto } from './dto/update-loginstatus.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Session, SessionSchemaName } from './schema/schema';

@Injectable()
export class LoginstatusService {
  constructor(@InjectModel(SessionSchemaName) private sessionModel:mongoose.Model<Session>){}
 async findAll(req) {
     try {
      const res = await this.sessionModel.find({userId:req.user._id});
      return res.reverse()
     } catch (error) {
      
     }

    return `This action returns all loginstatus`;
  }

async remove(id: string) {
   await this.sessionModel.findByIdAndDelete({_id:id})
    return `Done!`;
  }
}
