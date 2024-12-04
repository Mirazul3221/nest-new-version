import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserquestionsService } from './userquestions.service';
import { CreateUserquestionDto } from './dto/create-userquestion.dto';
import { UpdateUserquestionDto } from './dto/update-userquestion.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('userquestions')
export class UserquestionsController {
  constructor(private readonly userquestionsService: UserquestionsService) {}
  @UseGuards(AuthGuard())
  @Post('create-question')
async createQuestion(@Req() req, @Body() createUserquestionDto: CreateUserquestionDto) {
    return await this.userquestionsService.create(createUserquestionDto,req.user);
  }

  
  @UseGuards(AuthGuard())
  @Post('edit-question/:id')
async editQuestion(@Param("id") id, @Body() createUserquestionDto: CreateUserquestionDto) {
    return await this.userquestionsService.edit(createUserquestionDto,id);
  }


  @UseGuards(AuthGuard())
  @Get('delete-question/:id')
async deleteQuestion(@Param("id") id) {
    return await this.userquestionsService.deleteQuestion(id);
  }
///////////////////////////////////////////////////////////////////
  @Post('create-comment')
  @UseGuards(AuthGuard())
  async createComment(@Req() req, @Body() container){
    

      const commentSchema = {
        userId:req.user.id,
           name:req.user.name,
           profile:req.user.profile,
           comment:container.comment,
           createdAt:new Date()
      }

      return await this.userquestionsService.createComment(commentSchema,container.questionId)
  }
/////////////////////////////////////////////////////////////////////////////////////
@Post('create-like')
@UseGuards(AuthGuard())
 async createLike (@Req() req, @Body() body){
  const userId = req.user.id
   return await this.userquestionsService.createLike(userId,body.questionId)
 }

  @Get('don')
  findAll() {
    console.log('don')
    return this.userquestionsService.findAll();
  }


  @UseGuards(AuthGuard())
  @Get('myquestions')
  async findMyAllQuestions(@Req() req) {
    const id = req.user._id
    return await this.userquestionsService.findMyAllQuestions(id);
  }


  @UseGuards(AuthGuard())//
  @Get('all-friends-questions')
  async findMyFriendsAllQuestions(@Query('skip') skip : number, @Req() req) {
    const id = req.user._id
    console.log(skip)
    return await this.userquestionsService.findMyFriendsAllQuestions(id,skip);
  }//

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userquestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserquestionDto: UpdateUserquestionDto) {
    return this.userquestionsService.update(+id, updateUserquestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userquestionsService.remove(+id);
  }
}
