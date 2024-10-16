import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SavequestionsService } from './savequestions.service';
import { CreateSavequestionDto } from './dto/create-savequestion.dto';
import { UpdateSavequestionDto } from './dto/update-savequestion.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('savequestions')
export class SavequestionsController {
  constructor(private readonly savequestionsService: SavequestionsService) {}

  @Post('create')
  @UseGuards(AuthGuard()) 
async create(@Req() req,  @Body() createSavequestionDto: CreateSavequestionDto) {
    return await this.savequestionsService.create(createSavequestionDto,req);
  }

  @Get('all')
  @UseGuards(AuthGuard()) 
  findAll(@Req() req) {
    return this.savequestionsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savequestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavequestionDto: UpdateSavequestionDto) {
    return this.savequestionsService.update(+id, updateSavequestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savequestionsService.remove(+id);
  }
}
