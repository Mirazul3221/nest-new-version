import { Controller, Post, Delete, Patch, Body, Param, Req, Get, UseGuards, Put } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { RespondFriendRequestDto } from './dto/respond-friend-request.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Post()
  @UseGuards(AuthGuard())//
  create(@Req() req, @Body() createFriendRequestDto: CreateFriendRequestDto) {
    const requesterId = req.user._id; // Assume you have some way of getting the logged-in user's ID
    return this.friendRequestService.create(requesterId, createFriendRequestDto);
  }
 
  @Post('cancel')
  @UseGuards(AuthGuard())
  async cancel(@Req() req, @Body() body: any) {
    const requesterId = await req.user._id; // Assume you have some way of getting the logged-in user's ID
    return await this.friendRequestService.cancel(requesterId, body.ID);
  }

  
  @Get(':requestId/respond')
  @UseGuards(AuthGuard())
  respond(
    @Req() req,
    @Param('requestId') requestId: string,
    @Body() respondFriendRequestDto: RespondFriendRequestDto,
  ) {
    const recipientId = req.user._id; // Assume you have some way of getting the logged-in user's ID
    console.log(recipientId)
    return this.friendRequestService.respond(recipientId, requestId, respondFriendRequestDto);
  }



//========================================================================
//========================================================================
//========================================================================
  @Get('get-friend/:status')
  @UseGuards(AuthGuard())
  myFriends(@Req() req,@Param("status") param) {
    const userId = req.user._id; // Assume you have some way of getting the logged-in user's ID
    return this.friendRequestService.myFriends(userId,param);
  }



  @Get('get-your-friend/:yourid/:status')
  async yourFriends(@Param("yourid") id:string, @Param("status" ) status:string) {
      
     if ((id && status) !== undefined) {
      return await this.friendRequestService.yourFriends(id,status);
     }
  }


  @Get('get-your-friend-send-req-by-me/:status')
  @UseGuards(AuthGuard())
  async allFriendsIdSendReqByMe(@Req() req, @Param("status" ) status:string) {
    const userId = req.user._id;
     if (status !== undefined) {
      return await this.friendRequestService.allFriendsIdSendReqByMe(userId,status);
     }
  }
}///
