import { PartialType } from '@nestjs/mapped-types';
import { CreateMessangerDto } from './create-messanger.dto';

export class UpdateMessangerDto extends PartialType(CreateMessangerDto) {}
