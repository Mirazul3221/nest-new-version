
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Reader extends Document {
  @IsOptional()
  @Prop({required:false})
  isOnline:boolean
  @Prop({required:false})
  role:string
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  balance: number;
  @Prop({ required: true })
  name: string;
  @Prop({ unique: [true, 'Email already exist'] })
  email: string;
  @Prop({ required: false, select: false })
  password: string;
  @IsOptional()
  @Prop({ required: false })
  title?:string
  @IsOptional()
  @Prop({ required: false })
  description?:string
  @IsOptional()
  @Prop({ required: false })
  education?:string
  @IsOptional()
  @Prop({ required: false })
  fblink? :string
  @Prop({ required: false })
  profile?:string
  @Prop({ required: false })
  otp?:number
  @IsOptional()
  @Prop({ required: false })
  totalCountQuestions:[]
  @IsOptional()
  @Prop({ type: [{ type: String, required:false }] })
  totalCountQuestionsId:string[]
  @IsOptional()
  @Prop({ type: [String], default:[]})
  blockedUsers:string[]

}

export const user_schema = SchemaFactory.createForClass(Reader);
export const user_model = Reader.name;