import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { MessangerService } from './messanger.service';
import { CreateImageMessangerDto, CreateMessangerDto, CreateVoiceMessageDto } from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller('messanger')
export class MessangerController {
  constructor(private readonly messangerService: MessangerService) {}

  @Post('message-create')
  @UseGuards(AuthGuard())
   @FormDataRequest({storage:FileSystemStoredFile})//
  async createTextMessage(@Body() createMessangerDto:CreateMessangerDto,@Req() req:any) {
    return await this.messangerService.createTextMessage(createMessangerDto,req);
  }
//

  @Post('image-create')
  @UseGuards(AuthGuard())
  @FormDataRequest({storage:FileSystemStoredFile})//
  async createImageMessage(@Body() createMessage:CreateImageMessangerDto, @Req() req:any) {
    return await this.messangerService.createImageMessage(createMessage,req);
  }
  @Post('voice-create')
  @UseGuards(AuthGuard())
  @FormDataRequest({storage:FileSystemStoredFile})//
  async createVoiceMessage(@Body() createMessage:CreateVoiceMessageDto, @Req() req:any) {
    return await this.messangerService.createVoiceMessage(createMessage,req);
  }


  @Post('story-create')
  @UseGuards(AuthGuard())
  async createStoryMessage(@Body() data, @Req() req:any) {
    console.log(data);
    return await this.messangerService.createStoryMessage(data, req)
  }


  @Get('update-message-seen-status')
  @UseGuards(AuthGuard())
  async updateMessageSeenStatus(@Req() req:any, @Query() user:any){
    const myId = req.user.id;  
   return await this.messangerService.updateMessageSeenStatus(user.senderId,myId)
  }


  @Get('count-all-unseen-message')
  @UseGuards(AuthGuard())
  async unSeenMessageCount(@Req() req:any){
    const myId = req.user.id;  
    return await this.messangerService.unSeenMessageCount(myId)
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

 

  @Get('get/:id/:page')
  @UseGuards(AuthGuard())
async  findMyFriendAllMessage(@Req() body:any,@Param('id') id:string, @Param('page') page:number) {
    return this.messangerService.findMessagesWithPagination(body.user._id,id,page);
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
