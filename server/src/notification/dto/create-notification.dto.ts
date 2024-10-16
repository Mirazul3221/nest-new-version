import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateNotificationDto {
    @IsNotEmpty()
    readerId: mongoose.Schema.Types.ObjectId;
    @IsOptional()
    message:any
    @IsNotEmpty()
    @IsBoolean()
    seen:boolean

}
