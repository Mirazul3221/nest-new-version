import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserquestionDto } from './dto/create-userquestion.dto';
import { UpdateUserquestionDto } from './dto/update-userquestion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersQuestion, QuestionDocument } from './schema/userquestions.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class UserquestionsService {

  constructor(
    @InjectModel(UsersQuestion.name) private QuestionModel: Model<QuestionDocument>
  ){}
  
 async create(createUserquestionDto: CreateUserquestionDto,user) {
  const {subject,chapter,prevExam,question,option_01,option_02,option_03,option_04,content} = createUserquestionDto;
    const createSlug = (text)=>{
      return text.toLowerCase().trim().replace(/[^a-z0-9/s-]/g,'-')
        .replace(/\s+/g,'-').replace(/-+/g,'-');
  }
  const date = new Date().getTime()
  const slug = createSlug('bcs-preparation-online-'+subject + '-' + chapter +'-'+question +'-'+ date)
  const fullSchema = {slug,userId:user._id,userName:user.name,userProfile:user.profile,...createUserquestionDto}
  // console.log(fullSchema)
  const existedQuestion = await this.QuestionModel.find({question})
  if (existedQuestion[0]?.question === question && existedQuestion[0]?.chapter === chapter && existedQuestion[0]?.prevExam === prevExam && existedQuestion[0]?.content == content
  ) {
    throw new ConflictException("This question already exist, please add new one")
  } else {
    const createQuestion = await new this.QuestionModel(fullSchema)
     createQuestion.save()
    return 'Question create success';
  }
  }

  async findMyAllQuestions(id) {
    const allQuestions = await this.QuestionModel.find({userId:id})
    return allQuestions;
  }//
  findAll() {
    return `This action returns all userquestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userquestion`;
  }

  update(id: number, updateUserquestionDto: UpdateUserquestionDto) {
    return `This action updates a #${id} userquestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} userquestion`;
  }
}
