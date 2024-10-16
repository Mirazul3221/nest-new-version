import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
@Schema(
    {timestamps:true}
)

export class MyProfile extends Document {
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'users',requiredPaths:true})
    userId: mongoose.Schema.Types.ObjectId
    @Prop({required:true})
    profile:string
}

export const myProfile_schema = SchemaFactory.createForClass(MyProfile)
export const myProfile_model = MyProfile.name