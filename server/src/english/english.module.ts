import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnglishController } from './english.controller';
import { EnglishService } from './english.service';
import { english_model, english_schema } from './schema/english.schema';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';


@Module({
  imports: [
    AuthModule,
    NestjsFormDataModule,
    MongooseModule.forRoot(process.env.db_uri, {
      dbName: 'AllQuestions',
    }),
    MongooseModule.forFeature([
      {
        name: english_model,
        schema: english_schema,
      },
    ]),
  ],
  controllers: [EnglishController],
  providers: [EnglishService],
})
export class EnglishModule {}
