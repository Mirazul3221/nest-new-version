import { PartialType } from '@nestjs/mapped-types';
import { CreateEnglishDto } from './create-english.dto';

export class UpdateBanglaDto extends PartialType(CreateEnglishDto) {}
