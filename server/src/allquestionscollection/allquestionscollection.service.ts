import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAllquestionscollectionDto } from './dto/create-allquestionscollection.dto';
import { UpdateAllquestionscollectionDto } from './dto/update-allquestionscollection.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  Allquestionscollection,
  allquestionscollection_model,
} from './schema/allquestionscollection.schema';

@Injectable()
export class AllquestionscollectionService {
  constructor(
    @InjectModel(allquestionscollection_model)
    private allquestionscollection: mongoose.Model<Allquestionscollection>,
  ) {}
  async create(
    createAllquestionscollectionDto: CreateAllquestionscollectionDto,
  ) {
    const {question,examName,otherExamName} = createAllquestionscollectionDto;
    const existQuestions = await this.allquestionscollection.findOne({question})
    if (existQuestions?.question == question && existQuestions?.examName == examName && existQuestions?.otherExamName == otherExamName) {
      throw new ConflictException("This question already exist, please add new one")
    } else {
      const createSlug = (text)=>{
          return  text.toLowerCase().trim().replace(/[^a-z0-9/s-]/g,'-')
            .replace(/\s+/g,'-').replace(/-+/g,'-');
      }
      const date = new Date()
      const slug = createSlug(createAllquestionscollectionDto.question+date)
      console.log(slug)
      const fullSchema = {slug,...createAllquestionscollectionDto}
      const created = await new this.allquestionscollection(
        fullSchema,
      );
      created.save();
    }

    return 'Question added successfully';
  }

 async findAll() {
    return await this.allquestionscollection.find()
  }
  //===================Find Documents fields==================
  async findBanglaForReader() {
    const bangla = await this.allquestionscollection.find({
      subject: 'Bangla',
    });

    const shuffle = function (array) {
      let randomArr = [];
      let indexArr = [];
      let i = 0;
      while (i < array.length) {
        let randomNumber = Math.floor(Math.random() * array.length);
        if (!indexArr.includes(randomNumber)) {
          randomArr.push(array[randomNumber]);
          indexArr.push(randomNumber);
          i++;
        }
      }
      return randomArr; //
    };

    const randQuestion = shuffle(bangla);
    return randQuestion;
  }
  async findBangla() {
    const bangla = await this.allquestionscollection
      .find({ subject: 'Bangla' })
      .sort({ createdAt: -1 });
    return bangla;
  }

  async findEnglishForReader(topicValue) {
    const english = await this.allquestionscollection.find({
      subject: 'English',
      topic:topicValue
    });

    const shuffle = function (array) {
      let randomArr = [];
      let indexArr = [];
      let i = 0;
      while (i < array.length) {
        let randomNumber = Math.floor(Math.random() * array.length);
        if (!indexArr.includes(randomNumber)) {
          randomArr.push(array[randomNumber]);
          indexArr.push(randomNumber);
          i++;
        }
      }
      return randomArr; //
    };

    const randQuestion = shuffle(english);
    return await randQuestion;
  }

  async findEnglish() {
    const english = await this.allquestionscollection
      .find({ subject: 'English' })
      .sort({ createdAt: -1 });
    return english;
  }

  //==================Public access================
  async findFromPublicPlace (id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log(isValid)
    const singleQuestion = await this.allquestionscollection.find(isValid ? {_id:id} : {slug : id});
    return singleQuestion;
  }

  async findTopicForPublicUser (topic){
    console.log(topic)
    return await this.allquestionscollection.find({topic})
  }
  async findEnglishSingleQuestion(id: string) {
    const singleQuestion = await this.allquestionscollection.findById(id);
    return singleQuestion;
  }

  async updateEnglis(id: string, body): Promise<{ msg: string }> {
    await this.allquestionscollection.findByIdAndUpdate(id, body, {
      new: true,
    });
    return await {
      msg: `updates English questin with id no : ${id} (successfully)`,
    };
  }

  async multipleQue(allQuestionsInfo) {
    // const objis = ['6658affe887a446b95f8f1f5','665c8370dd2891bb02503f0d','665cac0dd39bdea364dc6406']
    // console.log(allQuestionsInfo.questionId)
    const favouriteQuestion = await this.allquestionscollection.find({
      _id: allQuestionsInfo.questionId,
    });
    const suckedQue =await favouriteQuestion.filter((newQuestion)=>newQuestion.subject == allQuestionsInfo.subject)
    return suckedQue;
  }

  findOne(id: number) {
    return `This action returns a #${id} allquestionscollection`;
  }

  update(
    id: number,
    updateAllquestionscollectionDto: UpdateAllquestionscollectionDto,
  ) {
    return `This action updates a #${id} allquestionscollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} allquestionscollection`;
  }
  async searchQuestionByQuery(q){
    let option = {}
   if(q){
    option = {
      $or : [
        {subject : new RegExp(q.toLowerCase(),"i")},
        {topic : new RegExp(q.toLowerCase(),"i")},
        {question : new RegExp(q.toLowerCase(),"i")},
        {otherExamName : new RegExp(q.toLowerCase(),"i")},
        {description : new RegExp(q.toLowerCase(),"i")},
      ]
    }
   }

    const data = await this.allquestionscollection.find(option)
    const shuffle = function (array) {
      let randomArr = [];
      let indexArr = [];
      let i = 0;
      while (i < array.length) {
        let randomNumber = Math.floor(Math.random() * array.length);
        if (!indexArr.includes(randomNumber)) {
          randomArr.push(array[randomNumber]);
          indexArr.push(randomNumber);
          i++;
        }
      }
      return randomArr; //
    };

   return await shuffle(data)
  }

  //===========  Delete all document =================
 async deleteQuestion(id){
  console.log(id)
    await  this.allquestionscollection.findByIdAndDelete(id)
      return "Delete question success"
  }
}
