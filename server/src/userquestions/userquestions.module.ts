import { Module } from '@nestjs/common';
import { UserquestionsService } from './userquestions.service';
import { UserquestionsController } from './userquestions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersQuestion, QuestionSchema } from './schema/userquestions.schema';

@Module({
  imports:[AuthModule,
    MongooseModule.forFeature([
      {name:UsersQuestion.name,
        schema : QuestionSchema
      }
  ]),
  ],
  controllers: [UserquestionsController],
  providers: [UserquestionsService],
})
export class UserquestionsModule {}
