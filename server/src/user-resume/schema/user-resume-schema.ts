import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

class PrimaryData {
  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  title?: string;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String })
  location?: string;
}

class Education {
  @Prop({ type: String })
  type?: string;

  @Prop({ type: String })
  kind?: string;

  @Prop({ type: String })
  institution?: string;

  @Prop({ type: Number })
  cgpa?: number;
}

class Experience {
  @Prop({ type: String })
  company?: string;

  @Prop({ type: String })
  role?: string;

  @Prop({ type: String })
  duration?: string;
}


class Project {
  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  duration?: string;

  @Prop({ type: String })
   url?: string;

  @Prop({ type: String })
  description?: string;

}



class Skill {
  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  level?: string;
}


@Schema({timestamps:true})
export class CV {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reader' })
  userId: mongoose.Schema.Types.ObjectId; // Reference to the User model

  @Prop({ type: [Object], required: false })
  primaryData?: any[];

  @Prop({ type: [Object],required: false })
  education?: Education[];

  @Prop({ type: [Object],required: false })
  experience?: Experience[];

  @Prop({ type: [Object],required: false })
  project?: Project[];

  @Prop({ type: [Object],required: false })
  skills?:any[];

  @Prop({ type: [Object],required: false })
  langs?:any[];

  @Prop({ type: [Object],required: false })
  hobbies?:any[];
  
  @Prop({ type: Boolean, default: false })
  isActive: boolean;
}

export type CVDocument = CV & Document;
export const CVSchema = SchemaFactory.createForClass(CV);
