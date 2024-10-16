
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Bangla extends Document {
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true })
  subSubject: string;
  @Prop({ required: true })
  topic: string;
  @Prop({ required: false })
  isAuthor: string;
  @Prop({ required: true})
  examType: string;
  @Prop({ required: true})
  examName: string;
  @Prop({ required: true })
  examSeassion: number;
  @Prop({ required: false })
  otherExamName: string;
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

export const bangla_schema = SchemaFactory.createForClass(Bangla);
export const bangla_model = Bangla.name;
// console.log(bangla_model)