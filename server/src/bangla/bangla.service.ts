import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBanglaDto } from './dto/create-bangla.dto';
import { UpdateBanglaDto } from './dto/update-bangla.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bangla, bangla_model } from './schema/bangla.schema';
import mongoose from 'mongoose';

@Injectable()
export class BanglaService {
constructor(@InjectModel(bangla_model)
private banglaQuestionModel: mongoose.Model<Bangla>,){}

 async create(createBanglaDto: CreateBanglaDto) : Promise<{msg:string}> {
    const {subSubject,topic,isAuthor,examType,examName,examSeassion,otherExamName,question,rightAns,option_01,option_02,option_03,option_04,description} = createBanglaDto
    const banglaMcq =await this.banglaQuestionModel.findOne({subSubject,examName,topic,examSeassion,question})//
    if (banglaMcq) {
      throw new ConflictException('Question already exist ! ');
    } else {
      await this.banglaQuestionModel.create({
        subject:"বাংলা",
        subSubject:subSubject,
        topic:topic,
        isAuthor:isAuthor,
        examType:examType,
        examName:examName,
        examSeassion:examSeassion,
        otherExamName:otherExamName,
        question:question,
        rightAns:rightAns,
        option_01:option_01,
        option_02:option_02,
        option_03:option_03,
        option_04:option_04,
        description:description
      })
    }
     return await {msg:"Question added success"};
  }

  findAll() {
    return this.banglaQuestionModel.find({}).sort({createdAt:-1});
  }

  findOne(id: number) {
    return `This action returns a #${id} bangla`;
  }

  update(id: number, updateBanglaDto: UpdateBanglaDto) {
    return `This action updates a #${id} bangla`;
  }

  remove(id: number) {
    return `This action removes a #${id} bangla`;
  }
}//
