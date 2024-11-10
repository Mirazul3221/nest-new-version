import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessangerService } from './messanger.service';
import { CreateMessangerDto } from './dto/create-messanger.dto';
import { UpdateMessangerDto } from './dto/update-messanger.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('messanger')
export class MessangerController {
  constructor(private readonly messangerService: MessangerService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async create(@Body() createMessangerDto:CreateMessangerDto,@Req() req:any) {
    const me = req.user; 
    return await this.messangerService.create(createMessangerDto,me);
  }

 @Get('my-friends-by-message')
 @UseGuards(AuthGuard())
 async findAllFriendsByMessages (@Req() req : any){
  const myId = req.user.id; 
    return await this.messangerService.findAllFriendsByMessages(myId)
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

