import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMathDto {
    @IsNotEmpty()
    @IsString()
    readonly subSubject: string;
    @IsNotEmpty()
    @IsString()
    topic: string;
    @IsString()
    examName : string;
    @IsNotEmpty()
    @IsString()
    examType : string;
    @IsOptional()
    @IsString()
    otherExamName : string;
    @IsOptional()
    @IsString()
    examSeassion : string;
    @IsOptional()
    @IsString()
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


