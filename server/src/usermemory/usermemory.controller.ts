import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsermemoryService } from './usermemory.service';
import { AuthGuard } from '@nestjs/passport';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
@Controller('usermemory')
export class UsermemoryController {
  constructor(private readonly usermemoryService: UsermemoryService) {}


  @Post('memory-build')
    @FormDataRequest({storage:FileSystemStoredFile})
    @UseGuards(AuthGuard())
  async create(@Body() data:any, @Req() req:any) {
    return await this.usermemoryService.create(data,req);
  }

  @Get('all-users-memory')
  @UseGuards(AuthGuard())
 async findAll(@Req() data:any) {
  const myId = data.user._id.toString();
    return await this.usermemoryService.findAll(myId);
  }

  @Post('add-visitor-id')
    @UseGuards(AuthGuard())//
  async addVisitorId(@Body() data:any, @Req() req:any) {
    return await this.usermemoryService.addVisitorId(req,data);
  }

  
  @Post('add-visitor-action')
    @UseGuards(AuthGuard())//
  async addVisitorAction(@Body() data:any, @Req() req:any) {
    return await this.usermemoryService.addVisitorAction(req,data);
  }

    @Post('count-visitors')
  @UseGuards(AuthGuard())
 async checkVisitor(@Body() data:any) {
    return await this.usermemoryService.checkVisitor(data);
  }
}
