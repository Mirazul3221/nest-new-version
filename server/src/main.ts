import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));
  app.enableCors({
    allowedHeaders: '*',
    origin: "*",
    credentials: true,
  });
    app.set('trust proxy', true);
  await app.listen(process.env.base_uri);
}
bootstrap();
//============
