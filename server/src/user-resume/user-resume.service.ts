import { Injectable } from '@nestjs/common';
import { CreateUserResumeDto } from './dto/create-user-resume.dto';
import { UpdateUserResumeDto } from './dto/update-user-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CV, CVDocument } from './schema/user-resume-schema';
import { Model } from 'mongoose';

@Injectable()
export class UserResumeService {
  constructor (
    @InjectModel(CV.name) private  UserResume : Model <CVDocument>
  ){

  }
  async create(primaryData,userId) {
    const isExist = await this.UserResume.findOne({userId})

    if (isExist) {
        return 'Already Exist!'
    } else {
      const newResume = new this.UserResume({userId,primaryData});
      await newResume.save()
      return null
    }
  }

  async editPrimaryBio(primaryData,userId) {
    const isExist = await this.UserResume.findOne({userId})

    if (isExist) {
      isExist.primaryData[0]=primaryData;
      await isExist.save()
    } else {
      return null
    }
  }
  async updateEducation(educationData,userId) {
    const isExist = await this.UserResume.findOne({userId})

    if (isExist) {
      console.log(isExist)
      console.log(educationData)
      isExist.education.push(educationData);
      await isExist.save()
    } else {
      return null
    }
  }

  async deleteEducation(id, userId) {
    const isExist = await this.UserResume.findOne({ userId });
  
    if (isExist) {
      // Filter out the item
      const updatedEducation = isExist.education?.filter((item: any) => item?.id !== id);
  
      // Assign it back to the document
      isExist.education = updatedEducation;
  
      // Save the updated document
      await isExist.save();
      console.log(isExist.education)
      return isExist.education; // optional: return updated list
    } else {
      return null;
    }
  }
  
  async getPrimaryBio(id) {
    const getAllCvData = await this.UserResume.find({userId:id})
    return getAllCvData[0];
  }

  findOne(id: number) {
    return `This action returns a #${id} userResume`;
  }

  update(id: number, updateUserResumeDto: UpdateUserResumeDto) {
    return `This action updates a #${id} userResume`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResume`;
  }
}
