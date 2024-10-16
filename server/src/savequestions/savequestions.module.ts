import { Module } from '@nestjs/common';
import { SavequestionsService } from './savequestions.service';
import { SavequestionsController } from './savequestions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { savequestion_model, savequestion_schema } from './schema/savequestions.schems';

@Module({
  imports:[AuthModule,
    MongooseModule.forFeature([
      {name:savequestion_model,schema:savequestion_schema}
    ])
  ],
  controllers: [SavequestionsController],
  providers: [SavequestionsService],
})
export class SavequestionsModule {}
