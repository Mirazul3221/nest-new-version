import { Controller, Get, Post, Body, Patch, Param, UsePipes, ValidationPipe, UseGuards, HttpException, HttpStatus, UseInterceptors, Bind, UploadedFile, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAuthProfileDto } from './dto/update-auth.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Request } from 'express';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('verify-account')
  async verifyAccount(@Body() data){
    return await this.authService.verifyAccount(data)
  }


  @Post('/user/register')
  async register(
    @Body() userData: any, @Req() req : Request
  ): Promise <{msg:string}> {
    return await this.authService.register_user(userData,req);
  }

  @Post('/user/login')
  @UsePipes(ValidationPipe)
 async login(@Req() req:Request, @Body() userDto:CreateUserDto) : Promise<{ token: string; message: string }> {
    return await this.authService.loginInfo(userDto,req);
  }

  @Get('user/nearby')
  @UseGuards(AuthGuard())
  async findNearbyUsers(@Req() req:any) {
    const id = req.user._id
    return await this.authService.findNearbyUsers(id)
  }

  @Post("getmyprofile")
  async requestedData(@Body() userEmail){
    // console.log(userEmail.email)
     return await this.authService.findMyProfile(userEmail)
  }
  @Post("updatemyprofile")
  @UseGuards(AuthGuard())
  async requestedTitleData(@Body() title, @Req() req){
     return await this.authService.requestedAuthData(title,req)//
  }

  //=========End point for add balance and update status===========
  @Get("updatebalanceandlevel")
  @UseGuards(AuthGuard())
  async addLevel(@Req() req){
     return await this.authService.addLevel(req.user)  }

     
  @Get("updatedynamicbalance")
  @UseGuards(AuthGuard())
  async addBalance(@Req() req){
     return await this.authService.addBalance(req.user)  }

//========
  //GET
  //==============================
  @Get("/find")
  @UseGuards(AuthGuard())
 async findSingleUser(@Req() req){
  // const findUser = 
  // if(!findUser) throw new HttpException("User not found",404)
    return await this.authService.findSingleUser(req.user._id)
 }

//========
  //GET
  //==============================
  @Get("/get-bio")
  @UseGuards(AuthGuard())
 async getBio(@Req() req){
  // const findUser = 
  // if(!findUser) throw new HttpException("User not found",404)
    return await this.authService.getBio(req.user._id)
 }


 //================FIND USER BY PUBLIC=========================
 @Get('publicuser/find/:value')
 async findSingleUserByPublic(@Param("value") param){
  return await this.authService.findSingleUserByPublic(param)
 }
 @Get('publicuser/findbyid/:value')
 async findSingleUserByPublicUser(@Param("value") param){
  return await this.authService.findSingleUserByPublicUser(param)
 }

 @Get('get-half-user-data/findbyid/:value')
  @UseGuards(AuthGuard())
 async getHalfUserData(@Param("value") param){
  return await this.authService.getHalfUserData(param)
 }


 //PATCH
 //=====================
 @Patch("/updateProfile")
 @UseGuards(AuthGuard())
  @FormDataRequest({storage:FileSystemStoredFile})
 async updateUser(@Body() profile ,@Req() req){
  return await this.authService.updateAuthinticUserProfile(req.user,profile)
 }//

//  //===========upload files==============
//  @Post('upload')
//  @UseInterceptors(FileInterceptor("file",{
//   storage:diskStorage({destination:"../userprofile",filename:(req,file,cb)=>{
//     cb(null,`${file.originalname}`)
//   }})
//  }))
//  public async uploadFile(@UploadedFile() file : Express.Multer.File) {
//   console.log(file.path)
//    return "success";
//  }
//======================================
@Get('user/profile')
async profile (){
  return await this.authService.profile()
}

@UseGuards(AuthGuard())
@Get('user/find-user-profile-by-id/:id')
async userProfile (@Param('id') id){
  return await this.authService.userProfile(id)
}
//======================================
@Get('get-profile/:id')
async userProfileAndName (@Param('id') id){
   return await this.authService.userProfileAndName(id)
}
//======================================
@Post('get-multiple-profile')
async multipleUsersProfile (@Body() {ids}){
   return await this.authService.multipleUsersProfile(ids)
}
 //======================================
 //======================================
 //======LOGIN WITH FACEBOOK
 //======================================
 //======================================
 @Get('login/facebook')
 @UseGuards(AuthGuard('facebook'))
 async facebookLogin(): Promise<void> {
   // Redirect to Facebook login page
 }

 @Get('facebook/callback')
 @UseGuards(AuthGuard('facebook'))
 async facebookLoginCallback(@Req() req: any): Promise<any> {
   // Handle successful authentication
   return {
     message: 'Facebook login successful',
     user: req.user,
   };
 }
 //======================================
 //======================================
 //======LOGIN WITH Google
 //======================================
 //======================================

 @Get("/login/google")
 @UseGuards(AuthGuard("google"))
 async googleAuth(@Req() req) {
  return "ffghd"
 }

 @Get('google-redirect')
 @UseGuards(AuthGuard("google"))
 googleAuthRedirect(@Req() req) {
  if (!req.user) {
    return 'No user from google';
  }

  return {
    message: 'User information from google',
    user: req.user,
  };
 }

//===========================================
//===========================================
//===========================================
@Post('sendmail')
 async sendMail(@Body() user) : Promise <{msg:string}> {
 return await this.authService.sendMail(user.email)
 }
@Get('send-mail-to-reset-email')
 @UseGuards(AuthGuard())
 async sendMailForChangeEmail(@Req() req) : Promise <number> {
 return await this.authService.sendMailForChangeEmail(req.user.email)
 }

@Post('updatepass')
 async updatePass(@Body() body) {
  // console.log(body)
 return await this.authService.updatePass(body)
 }

 
@Post('varify-password')
 @UseGuards(AuthGuard())
 async verifyPass(@Body() data, @Req() req) {
 return await this.authService.verifyPass(req.user._id, data.password)
 }
@Post('update-email')
 @UseGuards(AuthGuard())
 async updateEmail(@Body() body, @Req() req) {
  // console.log(body)
 return await this.authService.updateEmail(body.email,req.user._id)
 }

 @Post('recovery-user')
 async findUserForUpdatePass(@Body() user){
  return await this.authService.findUserForUpdatePass(user)
 }

 //=================================================
 //===============Collect all questions=============
 //=================================================
 @Post('collect-all-questions')
 @UseGuards(AuthGuard())
async collectQuestion(@Body() questions, @Req() req){
return await this.authService.questionCollecton(questions,req)
}



////////////////////////////////////////////////////////////
@Get('get-all-read-questions')
@UseGuards(AuthGuard())
async retriveAllReadQuestion (@Req() req, @Query('type') type, @Query('page') page){
  const userId = req.user._id;
  return await this.authService.retrieveAllReadQuestion(userId,type,page,10)
}


//====================================================
//===========Logic for block and unblock users========
//====================================================
@Post('user/block/:targetId')
@UseGuards(AuthGuard())
async blockUser (@Req() req :any, @Param('targetId') targetId : string){
  const userId = req.user._id;
 return await this.authService.blockUser(userId,targetId)
}

@Post('user/unblock/:targetId')
@UseGuards(AuthGuard())
async unBlockUser (@Req() req :any, @Param('targetId') targetId : string){
  const userId = req.user._id;
 return await this.authService.unBlockUser(userId,targetId)
}
@Post('user/isblock/:targetId')
@UseGuards(AuthGuard())
async isBlockUser (@Req() req :any, @Param('targetId') targetId : string){
  const userId = req.user._id;
 return await this.authService.isBlockUser(userId,targetId)
}
@Post('user/isblockedme/:targetId')
@UseGuards(AuthGuard())
async isBlockedMe (@Req() req :any, @Param('targetId') targetId : string){
  const userId = req.user._id;
 return await this.authService.isBlockedMe(userId,targetId)
}



///////////////////////////Here is mutual friend related query//////////////////////
@Get('suggested-friends')
@UseGuards(AuthGuard())
async suggestedFriends (@Req() req :any){
 return await this.authService.suggestedFriends(req)
}
@Get('current-friends')
@UseGuards(AuthGuard())
async currentFriends (@Req() req :any){
 return await this.authService.currentFriends(req)
}
}
///=====