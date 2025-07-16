import { PartialType } from '@nestjs/mapped-types';
import { CreateSaveuserquestionincollectionDto } from './create-saveuserquestionincollection.dto';

export class UpdateSaveuserquestionincollectionDto extends PartialType(CreateSaveuserquestionincollectionDto) {}
