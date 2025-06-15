import * as webPush from 'web-push';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationRecord } from './schema/pushNotif';
import { Model } from 'mongoose';

@Injectable()
export class PushNotificationService implements OnModuleInit {
  constructor(private configService: ConfigService,@InjectModel(NotificationRecord.name)
    private readonly StoreSubKey: Model<NotificationRecord>,){}
  private subscriptions: any[] = [];

  onModuleInit() {
    webPush.setVapidDetails(
      'mailto:bdmirazul906@gmail.com',
    this.configService.get<string>('VAPID_PUBLIC_KEY'),
      this.configService.get<string>('VAPID_PRIVATE_KEY')
    );
  }


  async addSubscription(subscription: any) {
    const { key, userId } = subscription;
console.log(key)
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

  async getKey (){
    return await this.subscriptions
  }//

    async sendNotificationTo(req) {
      const {id,payload} = req;
     
    const currentKey = await this.StoreSubKey.find({userId:id})//
    if(currentKey.length === 0) return
    try {
      await webPush.sendNotification(currentKey[0]?.key, JSON.stringify(payload));
      return { message: 'Notifications sent success' };
    } catch (err) {
      console.error('Error sending notification', err);
    }
  }
}
