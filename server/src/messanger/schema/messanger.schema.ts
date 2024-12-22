import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
@Schema({
    timestamps: true,
  })
  
export class Messanger extends Document {
   @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Reader',requiredPaths:true})
   senderId:mongoose.Schema.Types.ObjectId;
   @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Reader',requiredPaths:true})
   receiverId:mongoose.Schema.Types.ObjectId
  @Prop({required:true})
  message:string
  @Prop({required:true})
  seenMessage:boolean
}

export const messangerSchema = SchemaFactory.createForClass(Messanger);
export const messangerModel = Messanger.name