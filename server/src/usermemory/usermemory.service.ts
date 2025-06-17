import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { UserMemory } from './schema/memorySchema';
import { Model } from 'mongoose';
import { PushNotificationService } from 'src/push_notification/push_notification.service';
import { NotificationRecord } from 'src/push_notification/schema/subscriptionSchema';
import axios from 'axios';
@Injectable()
export class UsermemoryService {
  constructor(
    @InjectModel(UserMemory.name)
    private readonly memoryModel: Model<UserMemory>,
    @InjectModel(NotificationRecord.name,'pushConnection')
    private readonly pushModel: Model<NotificationRecord>,
    private readonly ConfigService: ConfigService,
    private readonly pushNotificationService: PushNotificationService,

  ) {}
  async create(data, req) {
    // cloudinary.config.t
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name1'),
      api_key: this.ConfigService.get('Api_key1'),
      api_secret: this.ConfigService.get('Api_secret1'),
    });

    const base64Data = data.file.replace(/^data:image\/jpeg;base64,/, '');
    try {
      const uploadResponse = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Data}`,
        {
          folder: 'memory', // optional
          resource_type: 'image',
          format: 'jpg', // force .jpg format
        },
      );
      const newStory = new this.memoryModel({
        userId: req.user._id,
        story: uploadResponse.secure_url,
      });
      await newStory.save();
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new usermemory';
  }

async findAll(currentUserId: string) {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const allStory = await this.memoryModel
    .find(
      { createdAt: { $gte: twentyFourHoursAgo } },
      {
        visitors: 1,
        story: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
      }
    )
    .populate('userId', 'name profile')
    .sort({ createdAt: -1 });

  const storiesWithCount = allStory.map((story: any) => {
    const { visitors, ...rest } = story.toObject();
    return {
      ...rest,
      visitorCount: visitors?.length || 0,
    };
  });

  type GroupedStory = {
    user: {
      _id: any;
      name: string;
      profile: string;
    };
    stories: any[];
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
            profile: story.userId.profile,
          },
          stories: [],
        };
      }
      grouped[userId].stories.push(story);
    }

    for (const group of Object.values(grouped)) {
      group.stories.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    }

    // Convert to array and move current user story to the front
    const groupedArray = Object.values(grouped);
groupedArray.sort((a, b) => {
  const aId = a.user._id.toString();
  const bId = b.user._id.toString();
  if (aId === currentUserId) return -1;
  if (bId === currentUserId) return 1;
  return 0;
});


    return groupedArray;
  }

  return groupStoriesByUser(storiesWithCount);
}



  async addVisitorId(req, { storyId }) {
    const isExist = await this.memoryModel.findOne({ _id: storyId });
    const isVisited = isExist.visitors.some(
      (visitor) => visitor.id === req.user._id.toString(),
    );

    console.log(isVisited); // true or false
    if (isVisited) return;
    isExist.visitors.push({ id: req.user._id, action: [] });
    await isExist.save();
  }


 async addVisitorAction(req, { storyId, reaction }) {
  console.log(reaction)
  const isExist = await this.memoryModel.findOne({ _id: storyId });
  if (!isExist) throw new NotFoundException('Story not found');

  const visitor = isExist.visitors?.find(
    (visitor) => visitor.id === req.user._id.toString(),
  );
  if (!visitor) {
    throw new BadRequestException('Visitor not found in story visitors list');
  }

  if (!visitor.action) {
    visitor.action = []; // initialize if undefined
  }
if(visitor.action.length > 18) return;
  visitor.action.push(reaction);
  await isExist.save();
const sendableData = {
  title: 'New Reaction!',
  body: `${req.user.name} ${reaction} to your story.`,
  icon: req.user.profile?.replace('http://', 'https://'),
  url: './userdashboard/ttt',
};
const id = isExist.userId.toString();


try {
  //  const currentKey = await this.pushModel.find({ userId: id})//
  //  console.log(currentKey[0].key)
  //   if(currentKey.length === 0) return
    await axios.post('https://edu-socket.onrender.com/broadcast-to-a-single-user',{id,payload:sendableData})
} catch (error) {
  console.log(error)
}

  // await this.pushNotificationService.commonPush(isExist.userId,sendableData);

  return { success: true };
}


  async checkVisitor({ storyId }) {
    const story = await this.memoryModel.findOne(
      { _id: storyId },
      { visitors: 1 },
    ); // only fetch `visitors` field
    const totalVisitors = story?.visitors?.length;
    return totalVisitors;
  }
}
