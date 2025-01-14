import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessangerService } from './messanger.service';
import { CreateImageMessangerDto, CreateMessangerDto } from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('messanger')
export class MessangerController {
  constructor(private readonly messangerService: MessangerService) {}

  @Post('message-create')
  @UseGuards(AuthGuard())
  async createTextMessage(@Body() createMessangerDto:CreateMessangerDto,@Req() req:any) {
    const me = req.user._id; 
    return await this.messangerService.createTextMessage(createMessangerDto,me);
  }
//

  @Post('image-create')
  @UseGuards(AuthGuard())
  @FormDataRequest({storage:FileSystemStoredFile})//
  async createImageMessage(@Body() createMessage:CreateImageMessangerDto, @Req() req:any) {
    const me = req.user._id; 
    return await this.messangerService.createImageMessage(createMessage,me);
  }


  @Get('my-friends-by-both-message-and-profile')
  @UseGuards(AuthGuard())
  async getCombinedLastMessageAndUserProfiles (@Req() req:any){
    const myId = req.user.id; 
      return await this.messangerService.getCombinedLastMessageAndUserProfiles(myId)
  }

 @Get('my-friends-by-message')
 @UseGuards(AuthGuard())
 async findAllFriendsByMessages (@Req() req : any){
  const myId = req.user.id; 
    return await this.messangerService.findAllFriendsByMessages(myId)
 }


 @Post('update-emoji-in-message')
 @UseGuards(AuthGuard())
 async updateEmojiInMessanger(@Body() message:any){
  return await this.messangerService.updateEmojiInMessanger(message)
 }


  @Get('get/:id')
  @UseGuards(AuthGuard())
async  findMyFriendAllMessage(@Req() body:any,@Param('id') id:string) {
    return this.messangerService.findMyFriendAllMessage(body.user,id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messangerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessangerDto: UpdateMessangerDto) {
    return this.messangerService.update(+id, updateMessangerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messangerService.remove(+id);
  }
}
//
