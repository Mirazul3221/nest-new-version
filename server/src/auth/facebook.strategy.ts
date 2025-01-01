import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.APP_ID, // Replace with your App ID
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET, // Replace with your App Secret
      callbackURL: `${process.env.CLIENT}/auth/facebook/callback`,
      profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      facebookId: id,
      firstName: name?.givenName,
      lastName: name?.familyName,
      email: emails?.[0]?.value,
      picture: photos?.[0]?.value,
      accessToken,
    };
    return user;
  }
}
