import { PartialType } from '@nestjs/mapped-types';
import { CreateUserquestionDto } from './create-userquestion.dto';

export class UpdateUserquestionDto extends PartialType(CreateUserquestionDto) {}
