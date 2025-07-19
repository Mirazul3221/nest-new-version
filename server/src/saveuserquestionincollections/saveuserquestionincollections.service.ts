import { ConflictException, Injectable } from '@nestjs/common';
import { Collection, collection_name } from './schema/collection';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuestionDocument, UsersQuestion } from 'src/userquestions/schema/userquestions.schema';
@Injectable()
export class SaveuserquestionincollectionsService {
  constructor(
    @InjectModel( collection_name) private CollectionModel: Model<Collection>,
    @InjectModel(UsersQuestion.name) private QuestionsModel: Model<QuestionDocument>
){
  }
  async create(data,req) {
    const {collectionName} = data;
    const isExist = await this.CollectionModel.find({collectionName});
    if (isExist.length > 0)  throw new ConflictException('collection already exist ! ');
    const final = await this.CollectionModel.create({
      userId:req.user._id,
      collectionName
    });
     return final
  }

 async findAll(userId) {
    return await this.CollectionModel.find({userId}).sort({createdAt:-1});
  }

 async findAllQuestions(collectionId) {
    const clt = await this.CollectionModel.findById(collectionId);
    const objectIds = clt.container.map(id => new Types.ObjectId(id));

   const questions = await this.QuestionsModel.find({
  _id: { $in: objectIds },
});
return questions;
  }


 async updateCollection(data) {
 const {collectionId,questionId} = data;
 const findCollection = await this.CollectionModel.findById(collectionId);
 if(findCollection.container.includes(questionId)){
     return {
    status:500, msg:'Question already exist'
   }
}
 if (findCollection.container.length >= 500) {
   return {
    status:500, msg:'Falie to save! Try with another collection'
   }
 }

findCollection.container.unshift(questionId);
await findCollection.save()
   return {
    status:200, msg:`saved to the "${findCollection.collectionName}" collection`
   }
  }

  findOne(id: number) {
    return `This action returns a #${id} saveuserquestionincollection`;
  }

  update(id: number) {
    return `This action updates a #${id} saveuserquestionincollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} saveuserquestionincollection`;
  }
}
