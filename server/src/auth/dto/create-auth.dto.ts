import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsOptional()
    role?:string
    @IsString()
    status?:string
    @IsNumber()
    balance?:string
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please Provide valid email' })
    readonly email: string;
    @ValidateIf((o) => o.password !== undefined && o.password !== null && o.password !== '')
    @MinLength(6)
    readonly password?: string;
    @IsString()
    @IsOptional()
    title?:string
    @IsString()
    @IsOptional()
    description?:string
    @IsString()
    @IsOptional()
    education?:string
    @IsString()
    @IsOptional()
    fblink?:string
    @IsString()
    @IsOptional()
    profile:string
    @IsNumber()
    @IsOptional()
    otp:number
    
}
