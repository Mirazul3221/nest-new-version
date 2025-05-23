import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Reader, user_model } from './schema/auth.schema';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user-dto';
// import { UpdateAuthProfileDto } from './dto/update-auth.dto';
// import { setTimeout } from 'timers/promises';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';
import {
  FriendRequest,
  FriendRequestDocument,
} from 'src/friend-request/schemas/friend-request.schema';
import { userInfo } from 'os';
import { UsersQuestion } from 'src/userquestions/schema/userquestions.schema';
import {
  SessionSchemaName,
  SessionSchema,
  Session,
} from 'src/loginstatus/schema/schema';
const nodemailer = require('nodemailer');
import { v4 as uuidv4 } from 'uuid';
import { UAParser } from 'ua-parser-js';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user_model)
    private userModel: mongoose.Model<Reader>,
    @InjectModel(FriendRequest.name)
    private friendRequestModel: mongoose.Model<FriendRequestDocument>,
    @InjectModel(SessionSchemaName)
    private sessionModel: mongoose.Model<Session>,
    private jwtService: JwtService,
    private readonly ConfigService: ConfigService,
  ) {}
  async register_user(
    createAuthDto: CreateAuthDto,
    req,
  ): Promise<{ token: string; msg: string }> {
    const { name, email, password, location, role, status, balance } =
      createAuthDto;
    const userInfo = await this.userModel.findOne({ email });
    if (userInfo) {
      throw new ConflictException('User already exist ! ');
    } else {
      const allSubject = [
        { sub: 'Bangla', rightAns: 0, wrongAns: 0 },
        { sub: 'English', rightAns: 0, wrongAns: 0 },
      ];
      const new_user = await this.userModel.create({
        role: role,
        status: status,
        balance: balance,
        name: name,
        email: email,
        password: await bcrypt.hash(password, 9),
        location: {
          type: 'Point',
          coordinates: [location.lon, location.lat],
        },
        title: 'Untitled User',
        description: '',
        profile:
          'https://res.cloudinary.com/dqwino0wb/image/upload/v1724909787/Screenshot_3_qrv36z.png',
        otp: '',
        totalCountQuestions: allSubject,
        totalCountQuestionsId: [],
      });

      ////////////////////////////////////////////////////////////////////////
      // Inside your method
      let ip =
        req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || // most reliable
        req.socket?.remoteAddress || // fallback
        req.ip; // fallback

      if (ip?.startsWith('::ffff:')) {
        ip = ip.replace('::ffff:', '');
      }

      if (
        ip === '::1' ||
        ip === '127.0.0.1' ||
        ip.startsWith('192.168') ||
        ip.startsWith('10.') ||
        ip.startsWith('172.')
      ) {
        // For development fallback only, NOT in production
        if (process.env.NODE_ENV !== 'production') {
          ip = '8.8.8.8';
        }
      }

      const sessionId = uuidv4();
      const userAgent = req.headers['user-agent'];
      const parser = new UAParser(userAgent);
      const parsedUA = parser.getResult();
      ///////////////////////////////////////////////////////////////////////////////////
      try {
        const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
        const data = geo.data;
        const geoLocation = `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;

        const session = await this.sessionModel.create({
          userId: new_user._id,
          sessionId,
          ipAddress: ip,
          userAgent, // raw user-agent string
          device: parsedUA.device.model || 'Unknown device',
          browser: parsedUA.browser.name || 'Unknown browser',
          os: parsedUA.os.name || 'Unknown OS',
          location: geoLocation,
          // location: (optional, set below if you use geo-IP),
        });
        ///////////////////////////////////////////////////////////////////////////////
        // 🔻 Delete older sessions beyond the most recent 5
        await this.sessionModel.deleteMany({
          userId: new_user._id,
          _id: {
            $nin: await this.sessionModel
              .find({ userId: new_user._id })
              .sort({ createdAt: -1 }) // latest first
              .limit(5)
              .select('_id')
              .then((docs) => docs.map((d) => d._id)),
          },
        });
        const token = await this.jwtService.sign({
          id: (await new_user)._id,
          sessionId,
          name: (await new_user).name,
          profile: (await new_user).profile,
          role: (await new_user).role,
        }); //
        return {
          token,
          msg: `Hey ${new_user.name}, Welcome, your registration process is accepted by our platform`,
        };
        //{ token, message: `Hey ${userName}, Welcome To My Plateform` }
      } catch (error) {}
    }
  }

  async loginInfo(
    userDto: CreateUserDto,
    req,
  ): Promise<{ token: string; message: string }> {
    const { email, password, location } = userDto;
    const { lat, lon } = location || {}; // Destructure location if it exists
    const loginInfo = await this.userModel
      .findOne({ email })
      .select('+password');

    if (!loginInfo) {
      throw new NotFoundException('User not found!');
    }

    const check_password = await bcrypt.compare(password, loginInfo.password);
    if (!check_password) {
      throw new UnauthorizedException('Invalid password!');
    }

    // If geolocation (lat, lon) is provided, update the user's location
    if (lat && lon) {
      loginInfo.location = {
        type: 'Point',
        coordinates: [lon, lat], // MongoDB expects [longitude, latitude]
      };
      await loginInfo.save(); // Save the updated location
    }

    ////////////////////////////////////////////////////////////////////////
    // Inside your method
    let ip =
      req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || // most reliable
      req.socket?.remoteAddress || // fallback
      req.ip; // fallback

    if (ip?.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    }

    if (
      ip === '::1' ||
      ip === '127.0.0.1' ||
      ip.startsWith('192.168') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.')
    ) {
      // For development fallback only, NOT in production
      if (process.env.NODE_ENV !== 'production') {
        ip = '8.8.8.8';
      }
    }

    const sessionId = uuidv4();
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const parsedUA = parser.getResult();
    // Get location from IP
    try {
      const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
      const data = geo.data;
      const geoLocation = `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;

      const session = await this.sessionModel.create({
        userId: loginInfo._id,
        sessionId,
        ipAddress: ip,
        userAgent, // raw user-agent string
        device: parsedUA.device.model || 'Unknown device',
        browser: parsedUA.browser.name || 'Unknown browser',
        os: parsedUA.os.name || 'Unknown OS',
        location: geoLocation,
        // location: (optional, set below if you use geo-IP),
      });

      // 🔻 Delete older sessions beyond the most recent 5
      await this.sessionModel.deleteMany({
        userId: loginInfo._id,
        _id: {
          $nin: await this.sessionModel
            .find({ userId: loginInfo._id })
            .sort({ createdAt: -1 }) // latest first
            .limit(5)
            .select('_id')
            .then((docs) => docs.map((d) => d._id)),
        },
      });

      //////////////////////////////////////////////////////////////////////

      // Create JWT token
      const token = await this.jwtService.sign({
        id: loginInfo._id,
        sessionId,
        name: loginInfo.name,
        profile: loginInfo.profile,
        role: loginInfo.role,
      });

      return { token, message: 'User login success' };
    } catch (error) {
      console.log(error);
    }
  }

  //===================================

  async findNearbyUsers(id) {
    // Step 1: Get all accepted and pending friend requests
    const friendRequests = await this.friendRequestModel
      .find({
        $or: [{ requester: id }, { recipient: id }],
        status: { $in: ['accepted', 'pending'] }, // ✅ Get only accepted and pending requests
      })
      .select('requester recipient')
      .lean();

    // Step 2: Extract the user IDs from friend requests
    const excludedUserIds = friendRequests.flatMap((req) => [
      req.requester.toString(),
      req.recipient.toString(),
    ]);

    // Remove the logged-in user ID (since we don't need to exclude themselves)
    const filteredExcludedUserIds = excludedUserIds.filter(
      (uid) => uid !== id.toString(),
    );

    const currentUser = await this.userModel.findById(id);

    if (!currentUser) {
      throw new Error('User not found');
    }

    const coordinates = currentUser?.location?.coordinates;

    if (!coordinates || coordinates.length !== 2) {
      throw new Error('Invalid location data');
    }

    // Step 3: Fetch nearby users but exclude the ones in `filteredExcludedUserIds`
    const nearbyUsers = await this.userModel
      .find({
        _id: { $nin: filteredExcludedUserIds, $ne: id }, // ✅ Exclude friends and current user
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates,
            },
            $maxDistance: 914000, // 50 km
          },
        },
      })
      .select(
        '-balance -email -createdAt -updatedAt -role -otp -totalCountQuestionsId -location -totalCountQuestions -blockedUsers -description',
      )
      .limit(50)
      .exec();
    return nearbyUsers;
  }

  //====================================
  findSingleUser(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid User!', 404);
    return this.userModel.findById({ _id: id }, { totalCountQuestionsId: 0 });
  }
  //====================================
  async getBio(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid User!', 404);
    return await this.userModel
      .findById({ _id: id })
      .select({ name: 1, title: 1, email: 1, description: 1, _id: 0 });
  }
  //================================
  async findSingleUserByPublic(user) {
    let option = {};
    if (user) {
      option = {
        $or: [
          { name: new RegExp(user.toLowerCase(), 'i') },
          { email: new RegExp(user.toLowerCase(), 'i') },
          { title: new RegExp(user.toLowerCase(), 'i') },
        ],
      };
    }

    const data = this.userModel.find(option);

    return data;
  }

  async findSingleUserByPublicUser(param) {
    const result = await this.userModel.findById({ _id: param });
    return result;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  //==================
  async updateAuthinticUserProfile(user: any, profile: any) {
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret'),
    });

    let url = '';
    try {
      if (profile) {
        const devide = user.profile.split('/');
        const lastPart = devide[devide.length - 1];
        const finalPart = lastPart.split('.')[0];
        console.log(finalPart);
        await cloudinary.uploader.destroy(`mcq_reader_profile/${finalPart}`);
        const data = await cloudinary.uploader.upload(profile.file.path, {
          folder: 'mcq_reader_profile',
          public_id: `${Date.now()}`,
          resource_type: 'auto',
        });
        url = data.url;
      } else {
        url = user.profile;
      }
      await this.userModel.findByIdAndUpdate(
        { _id: new mongoose.mongo.ObjectId(user.id) },
        {
          profile: url,
        },
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  } //

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  mcq_reader_profile;
  //find all register user
  async findMyProfile(emailObj) {
    const { email } = emailObj;
    const me = await this.userModel.findOne({ email });
    return { profile: me.profile, name: me.name };
  }

  async requestedAuthData(user, req) {
    const id = req.user._id;
    if (user.key == 'title') {
      await this.userModel.findByIdAndUpdate(
        id,
        { title: user.value },
        { new: true },
      );
    } else if (user.key == 'desc') {
      await this.userModel.findByIdAndUpdate(
        id,
        { description: user.value },
        { new: true },
      );
    } else if (user.key == 'link') {
      await this.userModel.findByIdAndUpdate(
        id,
        { fblink: user.value },
        { new: true },
      );
    }
    //   if (user.key == 'level') {
    //    await this.userModel.findByIdAndUpdate(id,{status:user.value},{new:true})
    //   //  await this.userModel.findByIdAndUpdate(id,{balance:previousBalance + },{new:true})
    //  }////
  }
  //=================addLevel================
  async addLevel(user) {
    const id = user.id;
    const status = user.status;
    //==============================================
    const bangla_r = user?.totalCountQuestions[0]?.rightAns;
    const bangla_w = user?.totalCountQuestions[0]?.wrongAns;
    const english_r = user?.totalCountQuestions[1]?.rightAns;
    const english_w = user?.totalCountQuestions[1]?.wrongAns;
    const totalReadQuestions = bangla_r + bangla_w + english_r + english_w;
    const percentise = Math.floor(
      ((bangla_r + english_r) / totalReadQuestions) * 100,
    );
    //===========================================================================
    //===========================================================================
    const value = totalReadQuestions;
    const p = percentise;
    if (value >= 900 && value < 3600 && p > 60) {
      status == 'Level One'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level One' },
            { new: true },
          );
    }
    if (value >= 3600 && value < 12100 && p > 60) {
      status == 'Level Two'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Two' },
            { new: true },
          );
    }
    if (value >= 12100 && value < 32400 && p > 60) {
      status == 'Level Three'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Three' },
            { new: true },
          );
    }
    if (value >= 32400 && value < 64800 && p > 60) {
      status == 'Level Four'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Four' },
            { new: true },
          );
    }
    if (value >= 64800 && value < 144400 && p > 60) {
      status == 'Level Five'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Five' },
            { new: true },
          );
    }
    if (value >= 144400 && value < 260100 && p > 60) {
      status == 'Level Six'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Six' },
            { new: true },
          );
    }
    if (value >= 260100 && value < 435600 && p > 60) {
      status == 'Level Seven'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Seven' },
            { new: true },
          );
    }
    if (value >= 435600 && value < 688900 && p > 60) {
      status == 'Level Eight'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Eight' },
            { new: true },
          );
    }
    if (value >= 688900 && value < 1000000 && p > 60) {
      status == 'Level Nine'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Nine' },
            { new: true },
          );
    }
  }

  //===============addBalance================
  async addBalance(user) {
    const id = user._id;
    const dynamicBalance = 0.005;
    if (!id) {
      throw new UnauthorizedException('User id not found');
    } else {
      await this.userModel.findByIdAndUpdate(
        id,
        { $inc: { balance: dynamicBalance } },
        { new: true },
      );
    }
  }

  //========profile update==============
  async userProfile(id) {
    // const user = await this.userModel.findById(id)
    // console.log()
    // return user.profile;
    const user = await this.userModel.findById(id, { profile: 1, _id: 0 }); // Fetch only the 'profile' field
    return user.profile; // Ensure proper handling if the user is not found
  }
  //========profile update==============
  async profile() {
    return 'Profile Update Done';
  }

async sendMail(email: string): Promise<{ msg: string }> {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const user = await this.userModel.findOne({ email });

  if (!user) {
    throw new NotFoundException('Email does not exist!');
  }

  const firstName = user.name?.split(' ')[0] || 'User';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bdmirazul906@gmail.com',
      pass: 'acco zbcl qzxu whzq',
    },
  });

  const mailOptions = {
    from: '"BCS Prep" <bdmirazul906@gmail.com>',
    to: email,
    subject: 'Password Reset Code - BCS Prep',
    html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <div style="text-align: right;">
          <img src="${user.profile}" alt="bcs logo" style="width: 60px; border-radius: 50%; border: 1px solid rgb(211, 210, 210);">
        </div>
        <h2 style="color: #333;">Hello, ${firstName}</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to change password for your account. Use the following code to confirm your request:
        </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; background: #f1f1f1; border: 1px dashed gray; color: gray; padding: 10px 20px; font-size: 18px; font-weight: bold; border-radius: 8px;">
              ${otp}
            </span>
          </div>
        <p style="font-size: 14px; color: #888;">If you didn’t request this, you can safely ignore this email.</p>
        <p style="font-weight: bold; color: #444;">Thank you,<br/>BCS Prep Team</p>
      </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions); // await without callback

  await this.userModel.findByIdAndUpdate(
    user._id,
    { otp },
    { new: true },
  );

  return { msg: 'Check your email box' };
}

  
async sendMailForChangeEmail(email: string): Promise<number> {
  const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
  const user = await this.userModel.findOne({ email });

  if (!user) {
    throw new NotFoundException('Email does not exist!');
  }

  const fullName = user.name.split(' ');
  const firstName = fullName[0];

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bdmirazul906@gmail.com',
      pass: 'acco zbcl qzxu whzq',
    },
  });

  const mailOptions = {
    from: '"BCS Prep" <bdmirazul906@gmail.com>',
    to: email,
    subject: 'Email Change Request - BCS Prep',
    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <div style="text-align: right;">
          <img src="${user.profile}" alt="bcs logo" style="width: 60px; border-radius: 50%; border: 1px solid rgb(211, 210, 210);">
        </div>
        <h2 style="color: #333;">Hello, ${firstName}</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to change the email address for your account. Use the following code to confirm your request:
        </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; background: #f1f1f1; border: 1px dashed gray; color: gray; padding: 10px 20px; font-size: 18px; font-weight: bold; border-radius: 8px;">
              ${otp}
            </span>
          </div>
        <p style="font-size: 14px; color: #888;">If you didn’t request this, you can safely ignore this email.</p>
        <p style="font-weight: bold; color: #444;">Thank you,<br/>BCS Prep Team</p>
      </div>
    </div>
    `,
  };

  // Await email sending properly
  await transporter.sendMail(mailOptions);

  return otp;
}

 async verifyPass(id,password) {
     const reader = await this.userModel.findOne({ _id: id }).select("+password");
         const check_password = await bcrypt.compare(password, reader.password);
    if (!check_password) {
      return false
    } else return true
  }

  async updatePass(body) {
    const { email, password } = body;
    console.log( email, password )
    const user = await this.userModel.findOne({ email: email });
    const strongPass = await bcrypt.hash(password, 9);
    await this.userModel.findByIdAndUpdate(
      user._id,
      { password: strongPass },
      { new: true },
    );
  }

  async updateEmail(email,id){
     const reader = await this.userModel.findOne({ _id: id });
     reader.email = email
     await reader.save()
  }

  async findUserForUpdatePass(user) {
    const reader = await this.userModel.findOne({ email: user.email });
    return reader;
  }
  async questionCollecton(questions, req) {
    const { _id, totalCountQuestions } = req.user;
    const { status, subject, id } = questions;
    const targetUser = await this.userModel.findById(_id);
    if (targetUser.totalCountQuestionsId.includes(id)) {
      return null;
    } else {
      targetUser?.totalCountQuestionsId.push(id);
      await targetUser.save();
      //=============UPDATE ENGLISH=================
      if ((subject == 'English' || subject == 'ইংরেজি') && status == 'right') {
        totalCountQuestions[1].rightAns = totalCountQuestions[1].rightAns + 1;
        await this.userModel.findByIdAndUpdate(_id, {
          totalCountQuestions: totalCountQuestions,
        });
      }
      if ((subject == 'English' || subject == 'ইংরেজি') && status == 'wrong') {
        totalCountQuestions[1].wrongAns = totalCountQuestions[1].wrongAns + 1;
        await this.userModel.findByIdAndUpdate(_id, {
          totalCountQuestions: totalCountQuestions,
        });
      }
      //
      //=============UPDATE BANGLA===============
      if ((subject == 'Bangla' || subject == 'বাংলা') && status == 'right') {
        totalCountQuestions[0].rightAns = totalCountQuestions[0].rightAns + 1;
        await this.userModel.findByIdAndUpdate(_id, {
          totalCountQuestions: totalCountQuestions,
        });
      }
      if ((subject == 'Bangla' || subject == 'বাংলা') && status == 'wrong') {
        totalCountQuestions[0].wrongAns = totalCountQuestions[0].wrongAns + 1;
        await this.userModel.findByIdAndUpdate(_id, {
          totalCountQuestions: totalCountQuestions,
        });
      }
    }
  }
  /////////////////////////////Retrive all read question/////////////////////////////

  async retrieveAllReadQuestion(
    id: string,
    type: string,
    page: number,
    limit: number,
  ) {
    console.log('Page:', page);
    console.log('Type:', type);

    const targetUser = await this.userModel
      .findById(id)
      .populate({
        path: 'totalCountQuestionsId',
        select:
          '_id userId slug userName userProfile prevExam question option_01 option_02 option_03 option_04 rightAns content likes comments createdAt subject chapter',
        model: 'UsersQuestion',
      })
      .lean(); // Convert Mongoose document to a plain JavaScript object

    if (!targetUser) return { message: 'User not found' };

    // Ensure totalCountQuestionsId is an array
    const questions: any[] = targetUser.totalCountQuestionsId || [];

    // Filter by subject type
    const filteredQuestions = questions
      .filter((q) => q.subject === type)
      .map((q) => ({
        ...q,
        totalComments: q.comments?.length || 0, // Add totalComments field
      }));

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const result = filteredQuestions.slice(startIndex, startIndex + limit);

    console.log('Paginated Questions:', result);
    return result.reverse();
  }

  //////////////////////////////////////////////////////Here is the logic to block and unblock users/////////////////////////////////////////////
  async blockUser(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(authId);
    if (!isExist) throw new NotFoundException('User not found');
    if (!isExist.blockedUsers.includes(targetId)) {
      isExist.blockedUsers.push(targetId);
      await isExist.save();
    }
    return 'User blocked successfully';
  }

  async unBlockUser(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(authId);
    if (!isExist) throw new NotFoundException('User not found');

    isExist.blockedUsers = isExist.blockedUsers.filter(
      (id) => id.toString() !== targetId,
    ); // Ensure proper type comparison
    await isExist.save();

    return 'User unblocked successfully';
  }

  async isBlockUser(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(authId);
    if (!isExist) throw new NotFoundException('User not found');
    return isExist.blockedUsers.includes(targetId);
  }
  async isBlockedMe(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(targetId);
    if (!isExist) throw new NotFoundException('User not found');
    return isExist.blockedUsers.includes(authId);
  }

  //==========================================================================================================-
  async userProfileAndName(id: string) {
    return await this.userModel
      .findById(id)
      .select(
        '-password -totalCountQuestions -totalCountQuestionsId -balance -email',
      );
  }

  //===========================================================================================================
  //=========================== SERVICE FOR OTHTER MODULE AND CONTROLLER ======================================
  //===========================================================================================================
  async findAllUserForRequestedFriend(allId) {
    // console.log(allId)
    const user = await this.userModel
      .find({ _id: allId })
      .sort({ createdAt: -1 });
    return user;
  }

  async updateUserOnlineStatus(id, bool) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { isOnline: bool },
    );
  }
}
