import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please Provide valid email' })
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsOptional()
    location: { lon: number; lat: number }; // Use 'number' instead of 'Number'
    
    
}