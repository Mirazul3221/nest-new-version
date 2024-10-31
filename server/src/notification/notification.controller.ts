import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
// import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async create(@Req() req, @Body() body:any) {
    return await this.notificationService.create(req, body);
  }

  @Get("find")
  @UseGuards(AuthGuard())
  async findAll(@Req() req) {
    const id = req.user._id
    return await this.notificationService.findAll(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notificationService.findOne(+id);
  // }//

  @Get('seen-and-delete')
  @UseGuards(AuthGuard())
 async updateAndDelete(@Req() req:any) {
    return await this.notificationService.seenAllAndDelete(req.user._id);
  }

  @Get('delete-one/:requesterName')
  @UseGuards(AuthGuard())
  deleteOne(@Param('requesterName') requesterName:string, @Req() req:any) {
    const id = req.user._id
    console.log(id,requesterName)//
    return this.notificationService.deleteOne(id,requesterName);
  }

  @Get('delete-many')//
  @UseGuards(AuthGuard())
  deleteMany() {
    return this.notificationService.deleteMany();
  }
 
  @Get("notification-to-all-readers/:topic")
  @UseGuards(AuthGuard())
  async putNotificationToAllReader(@Req() req:any,@Param('topic') topic:string){
    const user = req.user
   return await this.notificationService.putNotificationToAllFriends(topic,user)//
  }
}
