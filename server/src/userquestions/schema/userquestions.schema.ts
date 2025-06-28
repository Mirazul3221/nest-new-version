import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CommentSchema } from './comment.schema';
import { IsOptional } from 'class-validator';
@Schema({ timestamps: true })
export class UsersQuestion extends Document {
  @Prop({ type: String, required: true })
  slug: string; // Author of the post
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reader' })
  userId: mongoose.Schema.Types.ObjectId; // Reference to the User model
  @Prop({ type: String, required: true })
  userName: string; // Author of the post
  @Prop({ type: String, required: true })
  subject: string;
  @Prop({ type: String, required: true })
  chapter: string;
  @Prop({ type: String, required: false })
  prevExam: string;
  @Prop({ type: String, required: true })
  question: string;
  @Prop({ type: String, required: true })
  option_01: string;
  @Prop({ type: String, required: true })
  option_02: string;
  @Prop({ type: String, required: true })
  option_03: string;
  @Prop({ type: String, required: true })
  option_04: string;
  @Prop({ type: Number, required: true })
  rightAns: number;
  @Prop({ type: String, required: false })
  content: string;
  ///////////////////////////////////////////////////////////////
@Prop({
  type: {
    likes: [{ type: String }],
    dislikes: [{ type: String }],
     _id: false,
  },
  default: { likes: [], dislikes: [] },
})
reactions: {
  likes: string[];
  dislikes: string[];
};
  ////////////////////////////////////////////////////////////
  @Prop({ type: [] })
  comments: Comment[]; // Nested comments
}

// export type QuestionDocument = Question & Document;

export type QuestionDocument = UsersQuestion & Document;
export const QuestionSchema = SchemaFactory.createForClass(UsersQuestion); //
