import { Module } from '@nestjs/common';
import { MessangerService } from './messanger.service';
import { MessangerController } from './messanger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { messangerModel, messangerSchema } from './schema/messanger.schema';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports:[
    AuthModule,
    NestjsFormDataModule,
    MongooseModule.forFeature([{
      name:messangerModel,
      schema:messangerSchema
    }])
  ],
  controllers: [MessangerController],
  providers: [MessangerService],
})
export class MessangerModule {}
