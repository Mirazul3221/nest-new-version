import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserResumeService } from './user-resume.service';
import { CreateUserResumeDto } from './dto/create-user-resume.dto';
import { UpdateUserResumeDto } from './dto/update-user-resume.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-resume')
export class UserResumeController {
  constructor(private readonly userResumeService: UserResumeService) {}

  @Post('create')
    @UseGuards(AuthGuard())
  create(@Body() createUserResumeDto: CreateUserResumeDto, @Req() req) {
    return this.userResumeService.create(createUserResumeDto,req.user._id);
  }

  @Get()
  findAll() {
    return this.userResumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResumeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserResumeDto: UpdateUserResumeDto) {
    return this.userResumeService.update(+id, updateUserResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResumeService.remove(+id);
  }
}
