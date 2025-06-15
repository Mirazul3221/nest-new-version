import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema({ timestamps: true })
export class NotificationRecord extends Document {
  @Prop({ type: String, required: true })
  userId: string; // Reference to the User model
  ///////////////////////////////////////////////////////////////
@Prop({ type: Object, required: true })
key: Record<string, any>; // or simply: any
}
export const subKeySchema = SchemaFactory.createForClass(NotificationRecord); //
