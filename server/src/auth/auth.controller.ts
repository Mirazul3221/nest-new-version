import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, UseGuards, HttpException, HttpStatus, UseInterceptors, Bind, UploadedFile, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAuthProfileDto } from './dto/update-auth.dto';
import { Request as ExpReq } from 'express';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/user/register')
  @UsePipes(ValidationPipe)
  async register(
    @Body() createUserDto: CreateAuthDto,
  ): Promise <{msg:string}> {
    return await this.authService.register_user(createUserDto);
  }

  @Post('/user/login')
  @UsePipes(ValidationPipe)
 async login(@Request() req, @Body() userDto:CreateUserDto) : Promise<{ token: string; message: string }> {
  console.log(req.ip,req.headers['sec-ch-ua'])
  // console.log(req)
    return await this.authService.loginInfo(userDto);
  }
  @Post("getmyprofile")
  async requestedData(@Body() userEmail){
    // console.log(userEmail.email)
     return await this.authService.findMyProfile(userEmail)
  }
  @Post("updatemyprofile")
  @UseGuards(AuthGuard())
  async requestedTitleData(@Body() title, @Req() req){
    // console.log(userEmail.email)
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

 //================FIND USER BY PUBLIC=========================
 @Get('publicuser/find/:value')
 async findSingleUserByPublic(@Param("value") param){
  return await this.authService.findSingleUserByPublic(param)
 }
 @Get('publicuser/findbyid/:value')
 async findSingleUserByPublicUser(@Param("value") param){
  return await this.authService.findSingleUserByPublicUser(param)
 }


 //PATCH
 //=====================
 @Patch("/updateProfile")
 @UseGuards(AuthGuard())
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
 //======================================
 //======LOGIN WITH FACEBOOK
 //======================================
 //======================================
 @Get("/login/facebook")
 @UseGuards(AuthGuard("facebook"))
 async facebookLogin(): Promise<any> {
   return HttpStatus.OK;
 }

 @Get("/facebook/redirect")
 @UseGuards(AuthGuard("facebook"))
 async facebookLoginRedirect(@Req() req: ExpReq): Promise<any> {
   return {
     statusCode: HttpStatus.OK,
     data: req.user,
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


@Post('updateotp')
 async updateotp(@Body() otp) {
 return await this.authService.updateotp(otp)
 }
@Post('updatepass')
 async updatePass(@Body() body) {
  // console.log(body)
 return await this.authService.updatePass(body)
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

}
///=====