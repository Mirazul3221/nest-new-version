import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Reader, user_model } from "./schema/auth.schema";
import { Session, SessionSchemaName } from "src/loginstatus/schema/schema";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(user_model)
        private readonly userModel : Model<Reader>,
    @InjectModel(SessionSchemaName) private sessionModel: mongoose.Model<Session>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.jwt_secret,
          });
    }
  
async validate(payload: any) {
  const { id, sessionId } = payload;

  const userInfo = await this.userModel.findById(id);
  if (!userInfo) {
    throw new UnauthorizedException('Unauthorized, login first');
  }

  const session = await this.sessionModel.findOne({ sessionId, userId: id, revoked: false });
  if (!session) {
    throw new UnauthorizedException('Session has been revoked. Please log in again.');
  }

  return userInfo; // Optionally attach session info too
}
  }