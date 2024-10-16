import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BanglaService } from './bangla.service';
import { CreateBanglaDto } from './dto/create-bangla.dto';
import { UpdateBanglaDto } from './dto/update-bangla.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('bangla')
export class BanglaController {
  constructor(private readonly banglaService: BanglaService) {}


  @Post('/add')
  @UseGuards(AuthGuard())//
  @FormDataRequest({storage:FileSystemStoredFile})
 async create(@Body() createBanglaDto: CreateBanglaDto) {
    return await this.banglaService.create(createBanglaDto);
  }

  @Get('/find')
  findAll() {
    return this.banglaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banglaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanglaDto: UpdateBanglaDto) {
    return this.banglaService.update(+id, updateBanglaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banglaService.remove(+id);
  }
}
