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
  async create(createUserResumeDto: CreateUserResumeDto,id) {
    const newResume = new this.UserResume({userId:id});
    await newResume.save()
    return null
  }

  findAll() {
    return `This action returns all userResume`;
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
