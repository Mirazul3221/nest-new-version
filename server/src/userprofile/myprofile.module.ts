import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MyProfileController } from './myprofile.controller';
import { MyProfileService } from './myprofile.service';
import { myProfile_model, myProfile_schema } from './schema/myprofile.schema';
@Module({
  imports:[AuthModule,
    NestjsFormDataModule,
    MongooseModule.forRoot(process.env.db_uri, {
      dbName: 'AllQuestions',
    }),
    MongooseModule.forFeature([
      {
        name: myProfile_model,
        schema: myProfile_schema,
      },
    ]),
  ],
  controllers: [MyProfileController],
  providers: [MyProfileService],
})
export class MyProfileModule {}
