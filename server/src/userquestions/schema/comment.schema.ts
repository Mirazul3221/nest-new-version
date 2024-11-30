import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Comment extends Document {
    
    @Prop({ type: String, required: true })
    userId: string; // ID of the user who commented

    @Prop({ type: String, required: true })
    name: string; // name of the user who commented
    @Prop({ type: String, required: true })
    profile: string; // name of the user who commented

   @Prop({type:String,required:true})
    comment:string

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({type:[{type:String}]})
    likes:string[]

  @Prop({ type: [{ type: Comment }] })
  replies: Comment[]; // Nested replies
}

export const CommentSchema = SchemaFactory.createForClass(Comment);