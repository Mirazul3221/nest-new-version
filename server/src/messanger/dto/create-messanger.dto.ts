import { IsBoolean, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateMessangerDto {
    @IsNotEmpty()
    receiverId:mongoose.Schema.Types.ObjectId
    @IsNotEmpty()
    message:any
    @IsNotEmpty()
    reply:any
}//
