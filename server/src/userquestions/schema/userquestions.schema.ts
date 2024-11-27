import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Comment {
    @Prop({ type: String, required: true })
    userId: string; // ID of the user who commented

   @Prop({type:String,required:true})
    content:string

    @Prop({type:[{type:String}]})
    likes:string[]

  @Prop({ type: [{ type: Comment }] })
  replies: Comment[]; // Nested replies
}

@Schema({timestamps:true})
export class UsersQuestion extends Document {
    @Prop({ type: String, required: true })
    slug: string; // Author of the post
    @Prop({ type: String, required: true })
    userId: string; // Author of the post
    @Prop({ type: String, required: true })
    userName: string; // Author of the post
    @Prop({ type: String, required: true })
    userProfile: string; // Author of the post
    @Prop({type:String,required:true})
    subject : string
    @Prop({type:String,required:true})
    chapter:string
    @Prop({type:String,required:false})
    prevExam:string
    @Prop({type:String,required:true})
    question:string
    @Prop({type:String,required:true})
    option_01:string
    @Prop({type:String,required:true})
    option_02:string
    @Prop({type:String,required:true})
    option_03:string
    @Prop({type:String,required:true})
    option_04:string
    @Prop({type:Number,required:true})
    rightAns:number
    @Prop({type:String,required:false})
    content : string
    ///////////////////////////////////////////////////////////////
    @Prop({ type: [{ type: String }] })
    likes: string[]; // Array of user IDs who liked the post
    ////////////////////////////////////////////////////////////
    @Prop({ type: [] })
    comments: []; // Nested comments
}

// export type QuestionDocument = Question & Document;

export type QuestionDocument = UsersQuestion & Document;
export const QuestionSchema = SchemaFactory.createForClass(UsersQuestion);

