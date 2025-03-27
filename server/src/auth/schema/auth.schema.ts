import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Reader extends Document {
  @IsOptional()
  @Prop({ required: false })
  isOnline: boolean;

  @Prop({ required: false })
  role: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: false, select: false })
  password: string;

  @IsOptional()
  @Prop({ required: false })
  title?: string;

  @IsOptional()
  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // ✅ Fixed type definition
      required: false,
    },
  })
  location?: { type: string; coordinates: number[] };

  @IsOptional()
  @Prop({ required: false })
  description?: string;

  @IsOptional()
  @Prop({ required: false })
  education?: string;

  @IsOptional()
  @Prop({ required: false })
  fblink?: string;

  @Prop({ required: false })
  profile?: string;

  @Prop({ required: false })
  otp?: number;

  @IsOptional()
  @Prop({ required: false })
  totalCountQuestions: [];

  @IsOptional()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref:"UsersQuestion", required: true }] })
  totalCountQuestionsId:[{type:mongoose.Schema.Types.ObjectId, ref:"UsersQuestion"}];

  @IsOptional()
  @Prop({ type: [String], default: [] })
  blockedUsers: string[];
}

//// ✅ Create schema & add the 2dsphere index
export const user_schema = SchemaFactory.createForClass(Reader);

// ✅ Ensure a 2dsphere index for geospatial queries
user_schema.index({ location: '2dsphere' }); 

export const user_model = Reader.name;
