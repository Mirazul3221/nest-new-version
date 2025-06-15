import { Controller, Post, Body, Get } from '@nestjs/common';
import { PushNotificationService } from './push_notification.service';

@Controller()//
export class PushNotificationController {
  constructor(private readonly notificationService: PushNotificationService) {}

  @Post('save-subscription')
  subscribe(@Body() subscription: any) {
    this.notificationService.addSubscription(subscription);
    return { message: 'Subscription saved' };
  }

  @Get('get-key')
  getkey() {
    return this.notificationService.getKey();
  }
  @Post('broadcast-to-a-single-user')
 async broadcast(@Body() reqData:any) {
    return await this.notificationService.sendNotificationTo(reqData);
  }
}
