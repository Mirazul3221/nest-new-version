import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { UserMemory } from './schema/memorySchema';
import { Model } from 'mongoose';
@Injectable()
export class UsermemoryService {
  constructor(@InjectModel(UserMemory.name) private readonly memoryModel : Model<UserMemory>, private readonly ConfigService: ConfigService){}
async  create(data,req) {
    // cloudinary.config.t
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name1'),
      api_key: this.ConfigService.get('Api_key1'),
      api_secret: this.ConfigService.get('Api_secret1')
    })

 const base64Data = data.file.replace(/^data:image\/jpeg;base64,/, '');
 try {
  const  uploadResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`, {
    folder: 'memory', // optional
    public_id: 'bcs-prep', // optional
    overwrite: true,
    resource_type: 'image',
    format: 'jpg', // force .jpg format
  });
  console.log('Uploaded image URL:', uploadResponse.secure_url);
  const newStory = new this.memoryModel({userId:req.user._id,story:uploadResponse.secure_url});
    await newStory.save();
    console.log(newStory)
 } catch (error) {
   console.log(error)
 }
    return 'This action adds a new usermemory';
  }


async findAll() {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const allStory = await this.memoryModel
     .find(
    { createdAt: { $gte: twentyFourHoursAgo } },
    { visitors: 0 } // ⛔️ exclude the "visitors" field
  )
  .populate('userId', 'name profile')
    .sort({ createdAt: -1 }); // ✅ global sort

  // Define a type for grouped structure
  type GroupedStory = {
    user: {
      _id: any;
      name: string;
      profile: string;
    };
    stories: any[]; // Replace `any` with your Story type if available
  };

  function groupStoriesByUser(stories: any[]): GroupedStory[] {
    const grouped: Record<string, GroupedStory> = {};

    for (const story of stories) {
      const userId = story.userId._id.toString();
      if (!grouped[userId]) {
        grouped[userId] = {
          user: {
            _id: story.userId._id,
            name: story.userId.name,
            profile: story.userId.profile
          },
          stories: []
        };
      }
      grouped[userId].stories.push(story);
    }

    // ✅ Now TypeScript knows what `.stories` is
    for (const group of Object.values(grouped)) {
      group.stories.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return Object.values(grouped);
  }

  return groupStoriesByUser(allStory);
}

async addVisitorId (req,{storyId}){
     const isExist = await this.memoryModel.findOne({_id:storyId});
   const isVisited = isExist.visitors.some(
  (visitor) => visitor.id === req.user._id.toString()
);

console.log(isVisited); // true or false
     if(isVisited) return;
    isExist.visitors.push({id:req.user._id, action:[]});
    await isExist.save();
}


async checkVisitor ({storyId}){
    const story = await this.memoryModel.findOne({ _id: storyId }, { visitors: 1 }); // only fetch `visitors` field
const totalVisitors = story?.visitors?.length;
  return totalVisitors    
}
}
