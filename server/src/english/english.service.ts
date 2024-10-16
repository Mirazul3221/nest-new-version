import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateEnglishDto } from './dto/create-english.dto';
import { English, english_model } from './schema/english.schema';

@Injectable()
export class EnglishService {
constructor(@InjectModel(english_model)
private englishQuestionModel: mongoose.Model<English>){}

 async create(createEnglishDto: CreateEnglishDto) : Promise<{msg:string}> {
    const {subSubject,topic,examName,otherExamName,question,rightAns,option_01,option_02,option_03,option_04,description} = createEnglishDto
    const englishMcq =await this.englishQuestionModel.findOne({examName,topic,question})
    if (englishMcq) {
      throw new ConflictException('Question already exist ! ');
    } else {
      await this.englishQuestionModel.create({
        subject:"English",
        subSubject:subSubject,
        topic:topic,
        examName:examName,
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

  async findAllForUser() {

  const myQuestions = await this.englishQuestionModel.find();
    
  const shuffle = function (array){
    let randomArr = [];
   let indexArr = []
   let i = 0
   while (i < array.length) {
     let randomNumber = Math.floor(Math.random() *  array.length)
     if (!indexArr.includes(randomNumber)) {
        randomArr.push(array[randomNumber])
        indexArr.push(randomNumber)
        i++
     }
   }
 return(randomArr)//

}

const randQuestion = shuffle(myQuestions)
return randQuestion
  }

 async findAllForAssist(){
     return await this.englishQuestionModel.find().sort({createdAt:-1})
  }

  async findOne(id: string) {
   const singleQuestion =await this.englishQuestionModel.findById(id)
    return singleQuestion
  }

 async update(id: string, body) : Promise<{msg:string}> {
  await this.englishQuestionModel.findByIdAndUpdate(id,body,{new:true})
    return await {msg: `updates English questin with id no : ${id} (successfully)`};
    
  }

  remove(id: number) {
    return `This action removes a #${id} bangla`;
  }

  async multipleQue (allQuestionsId){
    // const objis = ['6658affe887a446b95f8f1f5','665c8370dd2891bb02503f0d','665cac0dd39bdea364dc6406']
   const test =await this.englishQuestionModel.find({_id:allQuestionsId})
   return test
  }
}
