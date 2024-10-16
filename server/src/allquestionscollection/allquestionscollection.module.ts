import { Module } from '@nestjs/common';
import { AllquestionscollectionService } from './allquestionscollection.service';
import { AllquestionscollectionController } from './allquestionscollection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { allquestionscollection_model, allquestionscollection_schema } from './schema/allquestionscollection.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([
        {name:allquestionscollection_model,
          schema : allquestionscollection_schema
        }
    ]),
    NestjsFormDataModule,AuthModule
  ],
  controllers: [AllquestionscollectionController],
  providers: [AllquestionscollectionService],
})
export class AllquestionscollectionModule {}
