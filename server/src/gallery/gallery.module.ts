import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { gallery_model, gallery_schema } from './schema/gallery.schema';
@Module({
  imports:[AuthModule,
    NestjsFormDataModule,
    MongooseModule.forRoot(process.env.db_uri, {
      dbName: 'AllQuestions',
    }),
    MongooseModule.forFeature([
      {
        name: gallery_model,
        schema: gallery_schema,
      },
    ]),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
