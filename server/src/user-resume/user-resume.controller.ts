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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Post('education')
    @UseGuards(AuthGuard())
  async addEducation(@Body() userResumeData, @Req() req) {
    return await this.userResumeService.addEducation(userResumeData,req.user._id);
  }
  @Post('update-education')
    @UseGuards(AuthGuard())
  async updateEducation(@Body() {eduId,filteredPayload}, @Req() req) {
    return await this.userResumeService.updateEducation(eduId,req.user._id,filteredPayload);
  }
  @Post('delete-education')
    @UseGuards(AuthGuard())
  async deleteEducation(@Body() {eduId}, @Req() req) {
    return await this.userResumeService.deleteEducation(eduId,req.user._id);
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Post('experience')
    @UseGuards(AuthGuard())
  async addExperience(@Body() userResumeData, @Req() req) {
    return await this.userResumeService.addExperience(userResumeData,req.user._id);
  }
  @Post('update-experience')
    @UseGuards(AuthGuard())
  async updateExperience(@Body() {expId,filteredPayload}, @Req() req) {
    return await this.userResumeService.updateExperience(expId,req.user._id,filteredPayload);
  }
  @Post('delete-experience')
    @UseGuards(AuthGuard())
  async deleteExperience(@Body() {expId}, @Req() req) {
    return await this.userResumeService.deleteExperience(expId,req.user._id);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Post('project')
    @UseGuards(AuthGuard())
  async addProject(@Body() userResumeData, @Req() req) {
    return await this.userResumeService.addProject(userResumeData,req.user._id);
  }
  @Post('re-project')
    @UseGuards(AuthGuard())
  async addReProject(@Body() userResumeData, @Req() req) {
    return await this.userResumeService.addReProject(userResumeData,req.user._id);
  }
  
  @Post('update-project')
    @UseGuards(AuthGuard())
  async updateProject(@Body() {proId,updateData}, @Req() req) {
    return await this.userResumeService.updateProject(proId,req.user._id,updateData);
  }
  @Post('delete-project')
    @UseGuards(AuthGuard())
  async deleteProject(@Body() {proId}, @Req() req) {
    return await this.userResumeService.deleteProject(proId,req.user._id);
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
