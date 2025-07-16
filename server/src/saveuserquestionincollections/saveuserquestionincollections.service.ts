import { Injectable } from '@nestjs/common';
import { CreateSaveuserquestionincollectionDto } from './dto/create-saveuserquestionincollection.dto';
import { UpdateSaveuserquestionincollectionDto } from './dto/update-saveuserquestionincollection.dto';

@Injectable()
export class SaveuserquestionincollectionsService {
  create(createSaveuserquestionincollectionDto: CreateSaveuserquestionincollectionDto) {
    return 'This action adds a new saveuserquestionincollection';
  }

  findAll() {
    return `This action returns all saveuserquestionincollections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saveuserquestionincollection`;
  }

  update(id: number, updateSaveuserquestionincollectionDto: UpdateSaveuserquestionincollectionDto) {
    return `This action updates a #${id} saveuserquestionincollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} saveuserquestionincollection`;
  }
}
