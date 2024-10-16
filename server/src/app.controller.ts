import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @UseGuards(AuthGuard())
  getHello(@Req() req) {
    // return this.appService.getHello();
    //======
    console.log(req.user)
  }
}
