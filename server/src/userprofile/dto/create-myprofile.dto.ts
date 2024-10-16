import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";

export class CreateMyProfileDto {
    @IsNotEmpty()
    @IsString()
    readonly userId:mongoose.Schema.Types.ObjectId
    @IsFile()
    @MaxFileSize(10e6, { message: "File size must be less than 1 MB" })
        @HasMimeType(['image/jpeg','image/png','image/jpg'])
    profile:FileSystemStoredFile
}
