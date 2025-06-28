import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { Reader, user_model } from './schema/auth.schema';
import mongoose from 'mongoose';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor( @InjectModel(user_model)
      private userModel: mongoose.Model<Reader>,) {
    super({
      clientID: process.env.APP_ID, // Replace with your App ID
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET, // Replace with your App Secret
      callbackURL: `${process.env.CLIENT}/auth/facebook/callback`,
      profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
      scope: ['email'],  // Explicitly request the email permission
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails,photos } = profile;
    
    // Check if emails exist in the profile
    if (!emails || emails.length === 0) {
      return done(new Error('Email not found in Facebook profile'), null);
    }

    const validateUser = await this.userModel.findOne({email:emails[0].value})
    if(validateUser?.email == emails[0].value){
      validateUser.name = name.givenName +' '+ name.familyName;
      validateUser.profile = photos[0].value;
       if ( validateUser.email !== emails[0].value) {
        validateUser.email = emails[0].value;
       }
      await validateUser.save()//

    } else {
     const allSubject = [
            { sub: 'Bangla', rightAns: 0, wrongAns: 0 },
            { sub: 'English', rightAns: 0, wrongAns: 0 },
          ];
          const new_user =await this.userModel.create({
            role: 'user',
            status: 'new',
            balance: 0,
            name:name.givenName +' ' + name.familyName,
            email:emails[0].value,
            password:'',
            title: 'Untitled User',
            description: '',
            profile:
             photos[0].value,
            otp: '',
            totalCountQuestions: allSubject,
            totalCountQuestionsId:[]
          });
    }
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      profile:photos[0].value
    };

    const payload = {
      user,
      accessToken,
    };
    done(null, payload);
  }
}
