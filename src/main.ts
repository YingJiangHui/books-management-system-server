import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { BadRequestException,ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { jwtConstants } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,exceptionFactory: (errors) =>
        new BadRequestException(errors.map((error) => ({ field: error.property,subErrors: Object.values(error.constraints) })),'错误'),
    })); // 全局范围使用接口参数验证
  app.use(
    session({
      secret: jwtConstants.secret,
      resave: false,
      saveUninitialized: false,
    })
  );
  await app.listen(3000);
}

bootstrap();
