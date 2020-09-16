import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import path from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static(path.join(__dirname, '..', 'static')));
  app.enableCors();
  await app.listen(3400);
}
bootstrap();
