import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import mongoose from "mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Collection extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reader' })
  userId: mongoose.Schema.Types.ObjectId; // Reference to the User model
  @Prop({ type: String, required: true})
  collectionName?:any;
  @IsOptional()
  @Prop({ type: [Object],required: false })
  container?:any[];
}

export const collection_schema = SchemaFactory.createForClass(Collection);
export const collection_name = Collection.name