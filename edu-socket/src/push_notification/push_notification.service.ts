import * as webPush from 'web-push';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PushNotificationService implements OnModuleInit {
  constructor(private configService: ConfigService){}
  private subscriptions: any[] = [];

  onModuleInit() {
    webPush.setVapidDetails(
      'mailto:bdmirazul906@gmail.com',
    this.configService.get<string>('VAPID_PUBLIC_KEY'),
      this.configService.get<string>('VAPID_PRIVATE_KEY')
    );
  }

  addSubscription(subscription: any) {
    const exists = this.subscriptions.find(sub => sub.endpoint === subscription.endpoint);
    if (!exists) this.subscriptions.push(subscription);
  }

  async getKey (){
    return await this.subscriptions
  }//

async sendNotificationToAll(payload: { title: string; body: string }) {
  for (const sub of this.subscriptions) {
    try {
      await webPush.sendNotification(sub, JSON.stringify(payload));
    } catch (err) {
      console.error('Error sending notification', err);
    }
  }
  return { message: 'Notifications sent success' };
}

}
