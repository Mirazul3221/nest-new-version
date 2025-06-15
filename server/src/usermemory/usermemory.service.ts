import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { UserMemory } from './schema/memorySchema';
import { Model } from 'mongoose';
import { PushNotificationService } from 'src/push_notification/push_notification.service';
@Injectable()
export class UsermemoryService {
  constructor(
    @InjectModel(UserMemory.name)
    private readonly memoryModel: Model<UserMemory>,
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

async findAll() {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Fetch documents excluding `visitors`, but keep it in a separate step to get its length
  const allStory = await this.memoryModel
    .find(
      { createdAt: { $gte: twentyFourHoursAgo } },
      { visitors: 1, story: 1, createdAt: 1, updatedAt: 1, userId: 1 } // keep visitors to count, but not return full array
    )
    .populate('userId', 'name profile')
    .sort({ createdAt: -1 });

  // Map to remove visitors and add visitorCount
  const storiesWithCount = allStory.map((story: any) => {
    const { visitors, ...rest } = story.toObject(); // convert to plain object
    return {
      ...rest,
      visitorCount: visitors?.length || 0, // count only
    };
  });

  // Type definition
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
    return Object.values(grouped);
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
console.log(req.user);
  await isExist.save();
const sendableData = {
  title: 'New Reaction!',
  body: `${req.user.name} ${reaction} to your story.`,
  icon: req.user.profile?.replace('http://', 'https://'),
  url: './userdashboard/ttt',
};


  await this.pushNotificationService.commonPush(isExist.userId,sendableData);

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
