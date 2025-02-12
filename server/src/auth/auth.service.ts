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
const nodemailer = require('nodemailer');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user_model)
    private userModel: mongoose.Model<Reader>,
    private jwtService: JwtService,
    private readonly ConfigService: ConfigService,
  ) {}
  async register_user(createAuthDto: CreateAuthDto): Promise<{token:string, msg: string }> {
    const { name, email, password, role, status, balance } = createAuthDto;
    const userInfo = await this.userModel.findOne({ email });
    if (userInfo) {
      throw new ConflictException('User already exist ! ');
    } else {
      const allSubject = [
        { sub: 'Bangla', rightAns: 0, wrongAns: 0 },
        { sub: 'English', rightAns: 0, wrongAns: 0 },
      ];
      const new_user =await this.userModel.create({
        role: role,
        status: status,
        balance: balance,
        name: name,
        email: email,
        password: await bcrypt.hash(password, 9),
        title: 'Untitled User',
        description: '',
        profile:
          'https://res.cloudinary.com/dqwino0wb/image/upload/v1724909787/Screenshot_3_qrv36z.png',
        otp: '',
        totalCountQuestions: allSubject,
        totalCountQuestionsId:[]
      });
      const token = await this.jwtService.sign({
        id: (await new_user)._id,
        name: (await new_user).name,
        profile: (await new_user).profile,
        role: (await new_user).role,
      });//
      return {token, msg: `Hey ${new_user.name}, Welcome, your registration process is accepted by our platform` };
      //{ token, message: `Hey ${userName}, Welcome To My Plateform` }
    }
  }

  //===============Login API===============//
  async loginInfo(
    userDto: CreateUserDto,
  ): Promise<{ token: string; message: string }> {
    const { email, password } = userDto;
    const loginInfo = await this.userModel
      .findOne({ email })
      .select('+password');
    if (loginInfo) {
      const check_password = await bcrypt.compare(password, loginInfo.password);
      if (check_password) {
        const token = await this.jwtService.sign({
          id: (await loginInfo)._id,
          name: (await loginInfo).name,
          profile: (await loginInfo).profile,
          role: (await loginInfo).role,
        });//
        return { token, message: 'User login success' };
      } else {
        throw new UnauthorizedException('Invalied password !');
      }
    } else {
      throw new NotFoundException('User not found !');
    }
  }

  //====================================
  findSingleUser(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid User!', 404);
    return this.userModel.findById({ _id: id }, { totalCountQuestionsId: 0 });
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
  async updateAuthinticUserProfile(user: any, profile:any) {
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret'),
    });

    let url = '';
    try {
      if (profile.profile) {
        const devide = user.profile.split('/');
        const lastPart = devide[devide.length - 1];
        const finalPart = lastPart.split('.')[0];
        await cloudinary.uploader.destroy(`mcq_reader_profile/${finalPart}`);
        const data = await cloudinary.uploader.upload(profile.profile, {
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
    } catch (error) {
      console.log(error);
    }
  }//

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
    console.log(user.profile)
    return user.profile // Ensure proper handling if the user is not found
  }
  //========profile update==============
  async profile() {
    return 'Profile Update Done';
  }

  async sendMail(email): Promise<{ msg: string }> {
    const otp = await Math.floor(100000 + Math.random() * 900000);
    const user = await this.userModel.findOne({ email: email });
    if (user) {
      // /===================================================================
      const fullName = user.name.split(' ');
      const firstName = fullName[0];
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'bdmirazul906@gmail.com',
          pass: 'acco zbcl qzxu whzq',
        },
      });
      var mailOptions = {
        from: 'bdmirazul906@gmail.com',
        to: email,
        subject: 'Password recovery',
        html: `  <div style="width: 400px; padding: 30px; background: #fff4f4;">
    <div style="position: relative; border-bottom: 2px solid rgb(92, 92, 92);"><img style="width: 80px;position: absolute; right: 10px; top: 10px;" src="https://res.cloudinary.com/df5rvx2id/image/upload/v1716576582/ujdocgrqsgr2fhpljbiy.png" alt="bcs logo"></div>
    <h2 style="font-weight: bolder;font-size: 26;">Hi ${firstName}</h2>
   <p style="font-size: 20px">We received a request to reset your password.
   Enter the following password reset code:</p>
   <h3 style="padding-top: 10px; font-size: 30px;"><span style="border:1px solid rgb(235, 9, 133);padding-left: 20px; padding-right: 20px;font-weight: bold; background: #ffd7e8; border-radius: 4px;padding-top: 10px;padding-bottom: 10px;color: rgb(50, 51, 51); font-size:22px;">${otp}</span></h3>
<h4 style="font-weight: bolder;font-size: 22px;">thank you</h4>
</div>`,
      };
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      await this.userModel.findByIdAndUpdate(
        user._id,
        { otp: await otp },
        { new: true },
      );
      return { msg: 'Check your email box' }; //
    } else {
      throw new NotFoundException('Email does not exist!');
    }
  }

  updateotp(otp) {}
  async updatePass(body) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email: email });
    const strongPass = await bcrypt.hash(password, 9);
    await this.userModel.findByIdAndUpdate(
      user._id,
      { password: strongPass },
      { new: true },
    );
  }

  async findUserForUpdatePass(user) {
    const reader = await this.userModel.findOne({ email: user.email });
    return reader;
  }
  async questionCollecton(questions, req) {
    const { _id, totalCountQuestions } = req.user;
    const { status, subject,id } = questions;
   const targetUser = await this.userModel.findById(_id);
   if (targetUser.totalCountQuestionsId.includes(id)) {
    return null
   } else {
    targetUser?.totalCountQuestionsId.push(id)//
    await targetUser.save()
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


  //==========================================================================================================-
  async userProfileAndName(id: string) {
    return await this.userModel.findById(id).select('-password -totalCountQuestions -totalCountQuestionsId -balance -email');
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
