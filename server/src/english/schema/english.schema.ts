
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class English extends Document {
  @Prop({ required: false })
  subject: string;
  @Prop({ required: true })
  subSubject: string;
  @Prop({ required: true })
  topic: string;
  @Prop({ required: false })
  examName: string;
  @Prop({ required: false })
  otherExamName: string;
  @Prop({ required: true })
  question: string;
  @Prop({ required: true })
  rightAns: number;
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

export const english_schema = SchemaFactory.createForClass(English);
export const english_model = English.name;
// console.log(bangla_model)