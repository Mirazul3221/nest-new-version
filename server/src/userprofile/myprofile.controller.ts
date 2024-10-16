import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';

import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';
import { CreateMyProfileDto } from './dto/create-myprofile.dto';
import { UpdateMyProfileDto } from './dto/update-myprofile.dto';
import { MyProfileService } from './myprofile.service';

@Controller('myprofile')
export class MyProfileController {
  constructor(private readonly MyProfileService: MyProfileService) {}

  @Post('/create')
  @UseGuards(AuthGuard())//
  @FormDataRequest({storage:FileSystemStoredFile})
  async create(@Body() createMyProfileDto: CreateMyProfileDto, @Req() req) {
    // console.log(req.user._id)
    // console.log(createMyProfileDto)
    return await this.MyProfileService.create(createMyProfileDto,req.user._id);
  }

//   @Get('/find')
//   @UseGuards(AuthGuard())//
//  async findAll( @Req() req) {
//     return await this.MyProfileService.findAll(req.user);
//   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.MyProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateMyProfileDto) {
    return this.MyProfileService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.MyProfileService.remove(+id);
  }
}
