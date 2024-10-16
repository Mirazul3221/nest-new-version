import { PartialType } from '@nestjs/mapped-types';
import { CreateBanglaDto } from './create-bangla.dto';

export class UpdateBanglaDto extends PartialType(CreateBanglaDto) {}
