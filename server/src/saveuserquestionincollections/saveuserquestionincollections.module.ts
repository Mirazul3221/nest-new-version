import { Module } from '@nestjs/common';
import { SaveuserquestionincollectionsService } from './saveuserquestionincollections.service';
import { SaveuserquestionincollectionsController } from './saveuserquestionincollections.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { collection_name, collection_schema } from './schema/collection';
import { UserquestionsModule } from 'src/userquestions/userquestions.module';

@Module({
    imports:[AuthModule,UserquestionsModule,
      MongooseModule.forFeature([
        {
          name: collection_name,
          schema: collection_schema,
        },
      ]),
    ],
  controllers: [SaveuserquestionincollectionsController],
  providers: [SaveuserquestionincollectionsService],
})
export class SaveuserquestionincollectionsModule {}
