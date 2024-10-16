import { PartialType } from '@nestjs/mapped-types';
import { CreateAllquestionscollectionDto } from './create-allquestionscollection.dto';

export class UpdateAllquestionscollectionDto extends PartialType(CreateAllquestionscollectionDto) {}
