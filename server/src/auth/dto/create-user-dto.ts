import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please Provide valid email' })
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
    
}