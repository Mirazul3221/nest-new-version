import { Module } from '@nestjs/common';
import { BanglaService } from './bangla.service';
import { BanglaController } from './bangla.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { bangla_model, bangla_schema } from './schema/bangla.schema';
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
        name: bangla_model,
        schema: bangla_schema,
      },
    ]),
  ],
  controllers: [BanglaController],
  providers: [BanglaService],
})
export class BanglaModule {}
