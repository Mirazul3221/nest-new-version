import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Reader, user_model } from "./schema/auth.schema";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(user_model)
        private readonly userModel : Model<Reader>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.jwt_secret,
          });
    }
  
    async validate(payload: any) {
      const {id} = payload
      const userInfo =await this.userModel.findById(id)
      if (!userInfo) {
         throw new UnauthorizedException("Unauthorized, login first")
      }
    //   console.log(payload)
      return userInfo
      //============
    }
  }