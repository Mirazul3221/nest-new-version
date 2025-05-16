import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop()
  userAgent: string;

  @Prop()
  ipAddress: string;

  @Prop({ default: false })
  revoked: boolean;

  // Device name or type (e.g., "iPhone 14", "Windows PC")
  @Prop()
  device: string;

  // Browser name (e.g., "Chrome", "Firefox")
  @Prop()
  browser: string;

  // Operating system (e.g., "macOS", "Android")
  @Prop()
  os: string;

  // Login location (based on IP)
  @Prop()
  location: string;

  // Whether this session is currently active
  @Prop({ default: true })
  isActive: boolean;

  // Last time the session was used
  @Prop()
  lastUsedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
export const SessionSchemaName = Session.name;
