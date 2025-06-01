import { Controller, Post, Body, Get } from '@nestjs/common';
import { PushNotificationService } from './push_notification.service';

@Controller()
export class PushNotificationController {
  constructor(private readonly notificationService: PushNotificationService) {}

  @Post('save-subscription')
  subscribe(@Body() subscription: any) {
    this.notificationService.addSubscription(subscription);
    return { message: 'Subscription saved' };
  }

  @Post('broadcast')
  broadcast(@Body() payload: { title: string; body: string }) {
    return this.notificationService.sendNotificationToAll(payload);
  }
}
