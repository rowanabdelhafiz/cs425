import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders:['Content-Type','Authorization'],
    credentials: true,
  });
  
  const port = process.env.PORT || 8000;
  await app.listen(port);
}
bootstrap();
