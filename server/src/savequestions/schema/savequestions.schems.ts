import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
@Schema(
    {timestamps:true}
)

export class SaveQuestions extends Document {
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'readers',requiredPaths:true})
    reader_id: mongoose.Schema.Types.ObjectId
    @Prop({required:true})
    question_id: mongoose.Schema.Types.ObjectId
}

export const savequestion_schema = SchemaFactory.createForClass(SaveQuestions)
export const savequestion_model = SaveQuestions.name