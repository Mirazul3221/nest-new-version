import * as webPush from 'web-push';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationRecord } from './schema/subscriptionSchema';
import { Model } from 'mongoose';

@Injectable()
export class PushNotificationService implements OnModuleInit {
  constructor(
    @InjectModel(NotificationRecord.name, 'pushConnection')
    private readonly StoreSubKey: Model<NotificationRecord>,
  ) {}
  private subscriptions: any[] = [];
  onModuleInit() {
    webPush.setVapidDetails(
      'mailto:bdmirazul906@gmail.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  async addSubscription(subscription: any) {
    const { key, userId } = subscription;

    try {
      const isExist = await this.StoreSubKey.find({ userId });
      //
      if (isExist.length > 0) {
        // console.log(isExist);
        isExist[0].key = key;
        await isExist[0].save(); // ✅ FIXED
      } else {
        await this.StoreSubKey.create({ userId, key });
      }
    } catch (error) {
      console.error('❌ Error in addSubscription:', error);
    }
  }

  async getKey() {
    return await this.subscriptions;
  }

  async sendNotificationToAll(payload: { title: string; body: string }) {
    for (const sub of this.subscriptions) {
      try {
        await webPush.sendNotification(sub, JSON.stringify(payload));
        return { message: 'Notifications sent success' };
      } catch (err) {
        console.error('Error sending notification', err);
      }
    }
  }

  async commonPush(userId,payload) {
    const currentKey = await this.StoreSubKey.find({userId})//
    if(currentKey.length === 0) return
    try {
      await webPush.sendNotification(currentKey[0]?.key, JSON.stringify(payload));
      return { message: 'Notifications sent success' };
    } catch (err) {
      console.error('Error sending notification', err);
    }
  }
}
