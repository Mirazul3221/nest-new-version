import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SaveuserquestionincollectionsService } from './saveuserquestionincollections.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('saveuserquestionincollections')
export class SaveuserquestionincollectionsController {
  constructor(private readonly saveuserquestionincollectionsService: SaveuserquestionincollectionsService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async create(@Body() data, @Req() req) {
    return await this.saveuserquestionincollectionsService.create(data,req);
  }

  @Get('get')
   @UseGuards(AuthGuard())
 async findAll(@Req() req) {
    const id = req.user._id;
    return await this.saveuserquestionincollectionsService.findAll(id);
  }


  @Post('find-collected-questions')
   @UseGuards(AuthGuard())
 async findAllQuestions(@Body() data) {
    const {collectionId} = data;
    return await this.saveuserquestionincollectionsService.findAllQuestions(collectionId);
  }

  @Post('update')
  @UseGuards(AuthGuard())
 updateCollection(@Body() data,@Req() req) {
  const myId = req.user._id;
    return this.saveuserquestionincollectionsService.updateCollection(data,myId);
  }

  @Post('delete-collection')
   @UseGuards(AuthGuard())
  remove(@Body() data,@Req() req) {
     const myId = req.user._id;
    return this.saveuserquestionincollectionsService.deleteCollection(data,myId);
  }
}
