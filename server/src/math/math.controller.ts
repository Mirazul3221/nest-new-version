import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { CreateMathDto } from './dto/create-math.dto';
// import { UpdateMathDto } from './dto/update-math.dto';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}


  @Post('/add')
  @UseGuards(AuthGuard())//
  @FormDataRequest({storage:FileSystemStoredFile})
 async create(@Body() createMathDto: CreateMathDto) {
    return await this.mathService.create(createMathDto);
  }

  @Get('/find')
 async findAll() {
    return await this.mathService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mathService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() UpdateMathDto: UpdateMathDto) {
  //   return this.mathService.update(+id, UpdateMathDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mathService.remove(+id);
  }
}
