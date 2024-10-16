import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Math, math_model } from './schema/math.schema';
import { CreateMathDto } from './dto/create-math.dto';


@Injectable()
export class MathService {
constructor(@InjectModel(math_model)
private mathQuestionModel: mongoose.Model<Math>,){}

 async create(createMathDto: CreateMathDto) : Promise<{msg:string}> {
    const {subSubject,topic,examName,examType,examSeassion,otherExamName,question,rightAns,option_01,option_02,option_03,option_04,description} = createMathDto
    const mathMcq =await this.mathQuestionModel.findOne({examName,topic,question})
    if (mathMcq) {
      throw new ConflictException('Question already exist ! ');
    } else {
      await this.mathQuestionModel.create({
        subject:"Math",
        subSubject:subSubject,
        topic:topic,
        examName:examName,
        examType:examType,
        otherExamName:otherExamName,
        examSeassion:examSeassion,
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

 async findAll() {
    return await this.mathQuestionModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} bangla`;
  }

  // update(id: number, updateBanglaDto:) {
  //   return `This action updates a #${id} bangla`;
  // }

  remove(id: number) {
    return `This action removes a #${id} bangla`;
  }
}
