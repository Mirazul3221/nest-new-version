import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
@Schema(
    {timestamps:true}
)

export class Gallery extends Document {
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'users',requiredPaths:true})
    assistId: mongoose.Schema.Types.ObjectId
    @Prop({required:true})
    url:string
}

export const gallery_schema = SchemaFactory.createForClass(Gallery)
export const gallery_model = Gallery.name