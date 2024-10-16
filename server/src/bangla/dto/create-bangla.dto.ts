import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBanglaDto {
    @IsNotEmpty()
    @IsString()
    readonly subSubject: string;
    @IsNotEmpty()
    @IsString()
    topic: string;
    @IsNotEmpty()
    @IsString()
    isAuthor: string;
    @IsNotEmpty()
    @IsString()
    examType : string;
    @IsNotEmpty()
    @IsString()
    examName : string;
    @IsOptional()
    @IsString()
    examSeassion : string;
    @IsOptional()
    @IsString()
    otherExamName : string;
    @IsString()
    @IsNotEmpty()
    question:string
    @IsString()
    @IsNotEmpty()
    rightAns:string
    @IsString()
    @IsNotEmpty()
    option_01:string
    @IsString()
    @IsNotEmpty()
    option_02:string
    @IsString()
    @IsNotEmpty()
    option_03:string
    @IsString()
    @IsNotEmpty()
    option_04:string
    @IsString()
    @IsOptional()
    description:string
}


