import { PartialType } from '@nestjs/mapped-types';
import { CreateSavequestionDto } from './create-savequestion.dto';

export class UpdateSavequestionDto extends PartialType(CreateSavequestionDto) {}
