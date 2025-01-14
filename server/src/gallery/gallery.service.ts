import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import {v2 as cloudinary} from 'cloudinary'
import { InjectModel } from '@nestjs/mongoose';
import { Gallery, gallery_model } from './schema/gallery.schema';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(gallery_model)
    private galleryModel: mongoose.Model<Gallery>,
    private readonly ConfigService: ConfigService
  ){}

  //=======================================================
  async create(createGalleryDto: CreateGalleryDto,user) {
    const {images} =await createGalleryDto;
    console.log(images)
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret')
    })
    // images.map((i)=>{
    //   console.log(i.path)
    // })
    try {
      if (images.length == undefined) {
        const {url} = await cloudinary.uploader.upload(images.path,{folder:"mcq_images"})
        this.galleryModel.create({assistId:user._id,url})
      }
       
      // for (let i = 0; i > images.length; i++) {
      //   const {url} = await cloudinary.uploader.upload(images[i].path,{folder:"mcq_images"})
      //   allImages.push({assistId:user._id, url})
      //   console.log(allImages)
      //   // this.galleryModel.insertMany(allImages)
      // }
      const allImages = []
      for (let i = 0; i < images.length; i++) {
       const {url} = await cloudinary.uploader.upload(images[i].path,{folder:"mcq_images"})  
       allImages.push({assistId:user._id,url})
      }
      (await this.galleryModel.insertMany(allImages,{ ordered: true }))
      // console.log()

    } catch (error) {
      console.log(error)
    }
    // this.galleryModel.insertMany(allImages)
    return await 'This action adds a new gallery';
  }

 async findAll(req) {
    const findImages = await this.galleryModel.find({assistId:new mongoose.mongo.ObjectId(req.id)})
    return findImages;
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
//