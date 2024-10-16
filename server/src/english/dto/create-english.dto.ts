import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEnglishDto {
    @IsNotEmpty()
    @IsString()
    readonly subSubject: string;
    @IsNotEmpty()
    @IsString()
    readonly topic: string;
    @IsString()
    readonly examName : string;
    @IsOptional()
    @IsString()
    readonly otherExamName : string;
    @IsString()
    @IsNotEmpty()
    question:string
    @IsNumber()
    @IsNotEmpty()
    rightAns:number
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
