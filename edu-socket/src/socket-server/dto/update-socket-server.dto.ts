import { PartialType } from '@nestjs/mapped-types';
import { CreateSocketServerDto } from './create-socket-server.dto';

export class UpdateSocketServerDto extends PartialType(CreateSocketServerDto) {
  id: number;
}
