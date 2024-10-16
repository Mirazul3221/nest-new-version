import { PartialType } from '@nestjs/mapped-types';
import { CreateMyProfileDto } from './create-myprofile.dto';


export class UpdateMyProfileDto extends PartialType(CreateMyProfileDto) {}
