import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
