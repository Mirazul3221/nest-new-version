import { Injectable } from '@nestjs/common';
import { CreateMyProfileDto } from './dto/create-myprofile.dto';
import { UpdateMyProfileDto } from './dto/update-myprofile.dto';
import {v2 as cloudinary} from 'cloudinary'
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { MyProfile, myProfile_model } from './schema/myprofile.schema';

@Injectable()
export class MyProfileService {
  constructor(
    @InjectModel(myProfile_model)
    private profileModel: mongoose.Model<MyProfile>,
    private readonly ConfigService: ConfigService
  ){}

  //=======================================================
  async create(createMyProfileDto: CreateMyProfileDto,id) {
    const allImages =[];
    // console.log(images[0].path)
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret')
    })
    // images.map((i)=>{
    //   console.log(i.path)
    // })
    // this.galleryModel.insertMany(allImages)
    const {profile} = createMyProfileDto;
    const img = await cloudinary.uploader.upload(profile.path)
   await this.profileModel.create(
      {
        userId:id,
        profile:img.url
      }
    )
    // return await 'This action adds a new gallery';
  }


//  async findAll(req) {
//     const findImages = await this.galleryModel.find({assistId:new mongoose.mongo.ObjectId(req.id)})
//     return findImages;
//   }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }

  update(id: number, updateMyProfileDto: UpdateMyProfileDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
