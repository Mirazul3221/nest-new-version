import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserquestionDto {
    @IsNotEmpty()
    @IsString()
    readonly subject: string;
    @IsNotEmpty()
    @IsString()
    readonly chapter: string;
    @IsNotEmpty()
    @IsString()
    readonly prevExam: string;
    @IsString()
    @IsNotEmpty()
    readonly question:string
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
    @IsNotEmpty()
    rightAns:string
    @IsString()
    @IsOptional()
    content?:string
}
