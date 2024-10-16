import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAuthProfileDto extends PartialType(CreateAuthDto) {
    @IsString()
    old_profile : string
    @IsString()
    @IsOptional()
    new_profile:any
}
