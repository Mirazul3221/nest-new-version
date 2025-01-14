import { IsBoolean, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class CreateMessangerDto {
    @IsNotEmpty()
    receiverId:mongoose.Schema.Types.ObjectId
    @IsNotEmpty()
    message:any
    @IsNotEmpty()
    reply:any
}//

export class CreateImageMessangerDto {
    @IsNotEmpty()
    receiverId:mongoose.Schema.Types.ObjectId
    @IsFile()
    @MaxFileSize(10e6, { message: "File size must be less than 1 MB" })
        @HasMimeType(['image/jpeg','image/png','image/jpg'])
    image:FileSystemStoredFile
    @IsNotEmpty()
    reply:any
}//
