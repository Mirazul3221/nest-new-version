import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateGalleryDto {
    @IsNotEmpty()
    @IsString()
    readonly assistId:mongoose.Schema.Types.ObjectId
    @IsNotEmpty()
    @IsString()
    images: any;
}
