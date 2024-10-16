import { Injectable } from '@nestjs/common';
import { CreateSocketServerDto } from './dto/create-socket-server.dto';
import { UpdateSocketServerDto } from './dto/update-socket-server.dto';

@Injectable()
export class SocketServerService {
  create(createSocketServerDto: CreateSocketServerDto) {
    return 'This action adds a new socketServer';
  }

  findAll() {
    return `This action returns all socketServer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socketServer`;
  }

  update(id: number, updateSocketServerDto: UpdateSocketServerDto) {
    return `This action updates a #${id} socketServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} socketServer`;
  }
}
