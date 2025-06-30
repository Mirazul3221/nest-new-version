import { Injectable } from '@nestjs/common';
import {
  CreateImageMessangerDto,
  CreateMessangerDto,
  CreateVoiceMessageDto,
} from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Messanger, messangerModel } from './schema/messanger.schema';
import mongoose, { Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Reader, user_model } from 'src/auth/schema/auth.schema';
import axios from 'axios';
import ogs from 'open-graph-scraper';
@Injectable()
export class MessangerService {
  constructor(
    @InjectModel(messangerModel)
    private MessangerModel: mongoose.Model<Messanger>,
    @InjectModel(user_model)
    private userModel: mongoose.Model<Reader>,
    private readonly authService: AuthService,
    private readonly ConfigService: ConfigService,
  ) {}
  async fetchMeta(url: string): Promise<any> {
    try {
      const cleanUrl = url.split('?')[0];

      const data = await ogs({
        url: cleanUrl,
        timeout: 20000, // ⏱ 20 seconds instead of default 10
        fetchOptions: {
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        },
      });

      if (data.result.success) {
        return {
          status: true,
          ogTitle: data.result.ogTitle,
          ogDescription: data.result.ogDescription,
          image: data.result.ogImage[0].url,
        };
      }
      if (!data.result.success) {
        return { status: false };
      }
      return data.result;
    } catch (error) {
      return { status: false };
    }
  }
  async createTextMessage(createMessangerDto: CreateMessangerDto, req) {
    const id = req.user._id;
    const receivedUser = await this.userModel.findById(
      createMessangerDto.receiverId,
    );
    const isblocked = receivedUser.blockedUsers?.includes(id);
    let verifyText = { status: false };
    const urlRegex = /\bhttps?:\/\/[^\s<>"']+/gi;
    const urls = createMessangerDto.message.match(urlRegex) || [];
    if (urls.length !== 0) {
      verifyText = await this.fetchMeta(createMessangerDto.message);
    }
    if (!isblocked) {
      const created = await this.MessangerModel.create({
        senderId: id,
        receiverId: createMessangerDto.receiverId,
        message: { content: createMessangerDto.message, media: '', voice: '' },
        reply: createMessangerDto.reply,
        seenMessage: createMessangerDto.seenMessage,
        others: verifyText.status ? verifyText : null,
      });

      const recId = createMessangerDto.receiverId.toString();

      const sendableData = {
        title: `New message!`,
        body: `${req.user.name} : ${createMessangerDto.message.slice(0.5)}.`,
        icon: req.user.profile?.replace('http://', 'https://'),
        url: `./userdashboard/messanger/${receivedUser.name}/${req.user._id}`,
      };
      await axios.post(
        'https://edu-socket.onrender.com/broadcast-to-a-single-user',
        { id: recId, payload: sendableData },
      );
      return created;
    } else {
      return 'User is blocked';
    }
  } //

  async createImageMessage(createMessage: CreateImageMessangerDto, req) {
    const id = req.user._id;
    const { receiverId, image, reply } = createMessage;
    const receivedUser = await this.userModel.findById(receiverId);
    const isblocked = receivedUser.blockedUsers?.includes(id);
    if (isblocked) return 'User is blocked';
    const replyAsArray = JSON.parse(reply);
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret'),
    });
    const data = await cloudinary.uploader.upload(image.path, {
      folder: 'image_message', // Specify the folder in Cloudinary
      resource_type: 'auto', // Automatically detect the file type (audio in this case)
    });
    const created = await this.MessangerModel.create({
      senderId: id,
      receiverId: receiverId,
      message: { content: '', media: data.secure_url, voice: '' },
      reply: replyAsArray,
      seenMessage: false,
    });

    const recId = receiverId.toString();

    const sendableData = {
      title: `New message!`,
      body: `${req.user.name} : sends you a image in your message box.`,
      icon: req.user.profile?.replace('http://', 'https://'),
      url: `./userdashboard/messanger/${receivedUser.name}/${req.user._id}`,
    };
    await axios.post(
      'https://edu-socket.onrender.com/broadcast-to-a-single-user',
      { id: recId, payload: sendableData },
    );
    return created;
  }
  async createVoiceMessage(createMessage: CreateVoiceMessageDto, req) {
    const { receiverId, voice, reply } = createMessage;
    const id = req.user._id;
    const receivedUser = await this.userModel.findById(receiverId);
    const isblocked = receivedUser.blockedUsers?.includes(id);
    if (isblocked) return 'User is blocked';
    const replyAsArray = JSON.parse(reply);
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret'),
    });
    const data = await cloudinary.uploader.upload(voice.path, {
      folder: 'voice_message', // Specify the folder in Cloudinary
      resource_type: 'auto', // Automatically detect the file type (audio in this case)
    });

    const created = await this.MessangerModel.create({
      senderId: id,
      receiverId: receiverId,
      message: {
        content: '',
        media: '', // Use the secure_url from Cloudinary for HTTPS
        voice: data.secure_url,
      },
      reply: replyAsArray,
      seenMessage: false,
    });

        const recId = receiverId.toString();

    const sendableData = {
      title: `New message!`,
      body: `${req.user.name} : sends you a voice in your message box.`,
      icon: req.user.profile?.replace('http://', 'https://'),
      url: `./userdashboard/messanger/${receivedUser.name}/${req.user._id}`,
    };
    await axios.post(
      'https://edu-socket.onrender.com/broadcast-to-a-single-user',
      { id: recId, payload: sendableData },
    );
    return created;
  }

  async updateMessageSeenStatus(friendId, myId) {
    await this.MessangerModel.updateMany(
      {
        senderId: friendId,
        receiverId: myId,
        seenMessage: false,
      },
      { $set: { seenMessage: true } },
    );
  }

  async unSeenMessageCount(myId) {
    const msg = await this.MessangerModel.find({
      receiverId: myId,
      seenMessage: false,
    });

    return msg.length;
  }

  async getCombinedLastMessageAndUserProfiles(myId) {
    const allMessage = await this.MessangerModel.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    });
    const myObjectId = new Types.ObjectId(myId);

    const result = await this.MessangerModel.aggregate([
      {
        $match: {
          $or: [{ senderId: myObjectId }, { receiverId: myObjectId }],
        },
      },
      {
        $project: {
          otherUserId: {
            $cond: {
              if: { $eq: ['$senderId', myObjectId] },
              then: '$receiverId',
              else: '$senderId',
            },
          },
          senderId: 1,
          receiverId: 1,
          message: 1,
          messageTime: '$createdAt',
          seenMessage: 1,
        },
      },
      {
        $sort: {
          messageTime: -1,
        },
      },
      {
        $group: {
          _id: '$otherUserId',
          senderId: { $first: '$senderId' },
          lastMessage: { $first: '$message' },
          lastMessageTime: { $first: '$messageTime' },
          unseenMessageCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$seenMessage', false] }, // Unseen messages
                    { $ne: ['$senderId', myObjectId] }, // Sent by the friend
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'readers',
          localField: '_id',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      {
        $unwind: '$userProfile',
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: '$userProfile.name',
          userProfile: '$userProfile.profile',
          senderId: 1,
          lastMessage: 1,
          lastMessageTime: 1,
          unseenMessageCount: 1,
        },
      },
    ]);
    return result;
  }

  async findAllFriendsByMessages(myId) {
    const allMessage = await this.MessangerModel.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    });

    const uniqueIds = new Set<string>();
    allMessage.forEach((question) => {
      uniqueIds.add(question.senderId.toString());
      uniqueIds.add(question.receiverId.toString());
    });
    const getAll = Array.from(uniqueIds);
    const allFriends =
      await this.authService.findAllUserForRequestedFriend(getAll);
    return await allFriends;
  }

  async updateEmojiInMessanger(message) {
    const { questionId, senderId, senderName, senderProfile, emoji } = message;
    const targetMessage = await this.MessangerModel.findById(questionId);
    const senderIds = targetMessage?.emoji?.map((m) => m.senderId);
    const checkDuplicate = senderIds?.includes(senderId);
    if (!checkDuplicate) {
      targetMessage.emoji.push({ senderId, senderName, senderProfile, emoji });
    } else {
      // Update existing emoji object if senderId is already present
      const index = targetMessage.emoji.findIndex(
        (em) => em.senderId == senderId,
      );
      if (index !== -1) {
        targetMessage.emoji[index].emoji = emoji;
        // Mark the specific array element as modified
        targetMessage.markModified(`emoji.${index}`);
      }
    }
    await targetMessage.save();
  } //

  async findMyFriendAllMessage(user, id, page) {
    const allMessage = await this.MessangerModel.find({
      $or: [
        { senderId: user._id, receiverId: id },
        { senderId: id, receiverId: user._id },
      ],
    }).sort({ createdAt: -1 });
    return await allMessage;
  }

  async findMessagesWithPagination(
    userId: string,
    friendId: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const messages = await this.MessangerModel.find({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    })
      .sort({ createdAt: -1 }) // Fetch latest messages first
      .skip(skip)
      .limit(limit);
    return messages.reverse();
  }

  findOne(id: number) {
    return `This action returns a #${id} messanger`;
  }

  update(id: number, updateMessangerDto: UpdateMessangerDto) {
    return `This action updates a #${id} messanger`;
  }

  remove(id: number) {
    return `This action removes a #${id} messanger`;
  }
} //
