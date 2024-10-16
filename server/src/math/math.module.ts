import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MathController } from './math.controller';
import { MathService } from './math.service';
import { math_model, math_schema } from './schema/math.schema';

@Module({
  imports: [
    AuthModule,
    NestjsFormDataModule,
    MongooseModule.forRoot(process.env.db_uri, {
      dbName: 'AllQuestions',
    }),
    MongooseModule.forFeature([
      {
        name: math_model,
        schema: math_schema,
      },
    ]),
  ],
  controllers: [MathController],
  providers: [MathService],
})
export class MathModule {}

