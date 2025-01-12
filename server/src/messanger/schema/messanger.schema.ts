import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

class EmojiObject {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  senderName: string;
  
  @Prop({ required: true })
  senderProfile: string;

  @Prop({ required: true })
  emoji: string;
}
class VariantMessage {
  content: string;

  media: string;
  
  voice: string;
}

// interface VariantMessage {
//   content:string,
//   media:string,
//   voice:string
// }
@Schema({
    timestamps: true,
  })

export class Messanger extends Document {
   @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Reader',requiredPaths:true})
   senderId:mongoose.Schema.Types.ObjectId;
   @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Reader',requiredPaths:true})
   receiverId:mongoose.Schema.Types.ObjectId
  @Prop({required:true})
  message:VariantMessage
  @Prop({ type: [EmojiObject], _id: false })
  emoji:EmojiObject[]
  @Prop({type:[]})
  reply:string[]
  @Prop({required:true})
  seenMessage:boolean
}

export const messangerSchema = SchemaFactory.createForClass(Messanger);
export const messangerModel = Messanger.name