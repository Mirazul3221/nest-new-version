import { IsOptional, IsString } from "class-validator";

export class UpdateAuthTitle{
    @IsString()
    @IsOptional()
    title?:string
}