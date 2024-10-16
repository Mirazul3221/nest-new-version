import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('/add')
  @UseGuards(AuthGuard())//
  @FormDataRequest({storage:FileSystemStoredFile})
  async create(@Body() createGalleryDto: CreateGalleryDto, @Req() req) {
    return await this.galleryService.create(createGalleryDto,req.user);
  }

  @Get('/find')
  @UseGuards(AuthGuard())//
 async findAll( @Req() req) {
    return await this.galleryService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
