import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import mongoose, { Document } from 'mongoose';
@Schema({ timestamps: true })
export class UserMemory extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reader' })
  userId: mongoose.Schema.Types.ObjectId; // Reference to the User model
  ///////////////////////////////////////////////////////////////
  @Prop({type:String, required: false })
  story: string;
  @Prop({type:String, required: false })
  memoryType: string;
  @IsOptional()
  @Prop({type:String, required: false })
  defaultText: string;
  @IsOptional()
  @Prop({type:Object, required: false })
  style: {};
  @IsOptional()
  @Prop({
  type: [
    {
      id: { type: String, required: false },
      action: { type: [Object], required: false }, // Array of any (Object is safest)
    },
  ],
  default: [],
})
visitors: { id: string; action: any[] }[];
}
export const memorySchema = SchemaFactory.createForClass(UserMemory); //
