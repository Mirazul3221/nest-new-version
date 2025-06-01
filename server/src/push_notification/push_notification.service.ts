import * as webPush from 'web-push';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PushNotificationService implements OnModuleInit {
  private subscriptions: any[] = [];

  onModuleInit() {
    webPush.setVapidDetails(
      'mailto:bdmirazul906@gmail.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  addSubscription(subscription: any) {
    const exists = this.subscriptions.find(sub => sub.endpoint === subscription.endpoint);
    if (!exists) this.subscriptions.push(subscription);
    // console.log(this.subscriptions)//
  }

  async sendNotificationToAll(payload: { title: string; body: string }) {
    for (const sub of this.subscriptions) {
      try {
        await webPush.sendNotification(sub, JSON.stringify(payload));
        // console.log(this.subscriptions,'cvh')//
      } catch (err) {
        console.error('Error sending notification', err);
      }
    }
    return { message: 'Notifications sent' };
  }
}
