import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserquestionDto } from './dto/create-userquestion.dto';
import { UpdateUserquestionDto } from './dto/update-userquestion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersQuestion, QuestionDocument } from './schema/userquestions.schema';
import { Model, Types } from 'mongoose';
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


  async createComment(commentSchema,questionId){

   const targetQuestion = await this.QuestionModel.findById(questionId)
    targetQuestion.comments.push(commentSchema)
    await targetQuestion.save()
  }
  /////////////////////////////////////////////////////////////////////////////////////
    async createLike(userId,questionId){
      const targetQuestion = await this.QuestionModel.findById(questionId)
      targetQuestion.likes.push(userId)
      await targetQuestion.save()
    }
  
  /////////////////////////////////////////////////////////////////////////////////////

  async findMyAllQuestions(id) {
  const filteredQuestions = await this.QuestionModel.aggregate([
    { $match: { userId: id.toString() } },

    { $unwind: "$comments" },

    // Sort the comments in descending order by their `createdAt`
    { $sort: { "comments.createdAt": -1 } },
 // Group back all fields and collect the sorted comments
 {
  $group: {
    _id: "$_id", // Group by question ID
    chapter: { $first: "$chapter" },
    content: { $first: "$content" },
    createdAt: { $first: "$createdAt" },
    likes: { $first: "$likes" },
    option_01: { $first: "$option_01" },
    option_02: { $first: "$option_02" },
    option_03: { $first: "$option_03" },
    option_04: { $first: "$option_04" },
    prevExam: { $first: "$prevExam" },
    question: { $first: "$question" },
    rightAns: { $first: "$rightAns" },
    slug: { $first: "$slug" },
    subject: { $first: "$subject" },
    updatedAt: { $first: "$updatedAt" },
    userId: { $first: "$userId" },
    userName: { $first: "$userName" },
    userProfile: { $first: "$userProfile" },
    __v: { $first: "$__v" },
    recentComments: { $push: "$comments" }, // Collect all sorted comments
  }},

  {
    $project: {
      chapter: 1,
      content: 1,
      createdAt: 1,
      likes: 1,
      option_01: 1,
      option_02: 1,
      option_03: 1,
      option_04: 1,
      prevExam: 1,
      question: 1,
      rightAns: 1,
      slug: 1,
      subject: 1,
      updatedAt: 1,
      userId: 1,
      userName: 1,
      userProfile: 1,
      __v: 1,
      comments: { $slice: ["$recentComments", 0, 2] }, // Limit to two comments
      // comments: { $reverseArray: { $slice: ["$recentComments", 0, 2] } }, // Reverse the array
    },
  },
  ])
    return filteredQuestions;
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
