import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginstatusDto } from './create-loginstatus.dto';

export class UpdateLoginstatusDto extends PartialType(CreateLoginstatusDto) {}
