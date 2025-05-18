import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { LoginstatusService } from './loginstatus.service';
import { CreateLoginstatusDto } from './dto/create-loginstatus.dto';
import { UpdateLoginstatusDto } from './dto/update-loginstatus.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('login-status')
export class LoginstatusController {
  constructor(private readonly loginstatusService: LoginstatusService) {}
    @UseGuards(AuthGuard())
  @Get('all')
 async findAll(@Req() req:any) {
    return await this.loginstatusService.findAll(req);
  }
  @Get(':id')
  remove(@Param('id') id: string) {
    return this.loginstatusService.remove(id);
  }
}
