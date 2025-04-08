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
  async create(@Body() userResumeData, @Req() req) {
    return await this.userResumeService.create(userResumeData,req.user._id);
  }
  @Post('edit-primary-bio')
    @UseGuards(AuthGuard())
  async editPrimaryBio(@Body() userResumeData, @Req() req) {
    return await this.userResumeService.editPrimaryBio(userResumeData,req.user._id);
  }

  @Post('update-education')
    @UseGuards(AuthGuard())
  async updateEducation(@Body() userResumeData, @Req() req) {
    return await this.userResumeService.updateEducation(userResumeData,req.user._id);
  }
  @Post('delete-education')
    @UseGuards(AuthGuard())
  async deleteEducation(@Body() {eduId}, @Req() req) {
    return await this.userResumeService.deleteEducation(eduId,req.user._id);
  }

  @Get('get-bio')
  @UseGuards(AuthGuard())
  async getPrimaryBio( @Req() req) {
    return await this.userResumeService.getPrimaryBio(req.user._id);
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
