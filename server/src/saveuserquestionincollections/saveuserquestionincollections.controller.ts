import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaveuserquestionincollectionsService } from './saveuserquestionincollections.service';
import { CreateSaveuserquestionincollectionDto } from './dto/create-saveuserquestionincollection.dto';
import { UpdateSaveuserquestionincollectionDto } from './dto/update-saveuserquestionincollection.dto';

@Controller('saveuserquestionincollections')
export class SaveuserquestionincollectionsController {
  constructor(private readonly saveuserquestionincollectionsService: SaveuserquestionincollectionsService) {}

  @Post()
  create(@Body() createSaveuserquestionincollectionDto: CreateSaveuserquestionincollectionDto) {
    return this.saveuserquestionincollectionsService.create(createSaveuserquestionincollectionDto);
  }

  @Get()
  findAll() {
    return this.saveuserquestionincollectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saveuserquestionincollectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaveuserquestionincollectionDto: UpdateSaveuserquestionincollectionDto) {
    return this.saveuserquestionincollectionsService.update(+id, updateSaveuserquestionincollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saveuserquestionincollectionsService.remove(+id);
  }
}
