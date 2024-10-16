
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Math extends Document {
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true })
  subSubject: string;
  @Prop({ required: true })
  topic: string;
  @Prop({ required: false})
  examName: string;
  @Prop({ required: false})
  examType: string;
  @Prop({ required: false })
  otherExamName: string;
  @Prop({ required: false })
  examSeassion: number;
  @Prop({ required: true })
  question: string;
  @Prop({ required: true })
  rightAns:number;
  @Prop({ required: true })
  option_01: string;
  @Prop({ required: true })
  option_02: string;
  @Prop({ required: true })
  option_03: string;
  @Prop({ required: true })
  option_04: string;
  @Prop({ required: false })
  description: string;
}

export const math_schema = SchemaFactory.createForClass(Math);
export const math_model = Math.name;
// console.log(bangla_model)