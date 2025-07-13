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
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: true,
      },
      action: {
        type: [Object],
        default: [],
        required: false,
      },
    },
  ],
  default: [],
})
visitors: {
  id: mongoose.Schema.Types.ObjectId;
  action: any[];
}[];
}
export const memorySchema = SchemaFactory.createForClass(UserMemory); //
