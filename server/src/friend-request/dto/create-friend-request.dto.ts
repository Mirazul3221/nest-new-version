import mongoose from "mongoose";

export class CreateFriendRequestDto {
    readonly recipient: mongoose.Schema.Types.ObjectId;
  }
  