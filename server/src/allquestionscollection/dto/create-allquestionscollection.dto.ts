import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAllquestionscollectionDto {
    @IsOptional()
    readonly slug : string;
    @IsNotEmpty()
    @IsString()
    readonly subject: string;
    @IsNotEmpty()
    @IsString()
    readonly subSubject: string;
    @IsNotEmpty()
    @IsString()
    readonly topic: string;
    @IsString()
    @IsOptional()
    readonly examName? : string;
    @IsOptional()
    @IsString()
    readonly isAuthor? : string;
    @IsOptional()
    @IsString()
    readonly examType? : string;
    @IsOptional()
    @IsString()
    readonly examSeassion? : string;
    @IsOptional()
    @IsString()
    readonly otherExamName? : string;
    @IsString()
    @IsNotEmpty()
    readonly question:string
    // @IsNumber()
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
    description?:string
}
