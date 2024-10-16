import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import mongoose, { Document } from "mongoose";


@Schema({
    timestamps: true,
  })
export class Notification extends Document {
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Reader',requiredPaths:true})
    readerId: mongoose.Schema.Types.ObjectId;
    @Prop()
    @IsOptional()
    @Prop({required:false})
    type:string
    @Prop()
    @IsOptional()
    @Prop({required:false})
    message:object[]
    @IsOptional()
    @Prop({required:false})
    seen: boolean;
}
export const notification_schema = SchemaFactory.createForClass(Notification);
export const notification_model = Notification.name;
//otificationSchema