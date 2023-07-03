import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as WinstonGraylog2 from 'winston-graylog2';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const whitelist = process.env.CORS_ORIGIN.split(',');
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: (origin, callback) => {
        origin = origin || 'undefined'; //ir's undefined when you call it from localhost
        if (whitelist.some(domain => origin?.includes(domain))) {
          callback(null, true);
        } else {
          console.log(`${origin} tries to access api`);
          throw new HttpException(`${origin} Not allowed by CORS`, HttpStatus.FORBIDDEN);
        }
      },
    },
    bodyParser: false,
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike('Wizard Universe Web API', {
              prettyPrint: true,
            })
          ),
        }),
        new WinstonGraylog2({
          name: 'Web API Graylog',
          handleExceptions: true,
          graylog: {
            servers: [
              {
                host: process.env.GRAYLOG_HOST,
                port: parseInt(process.env.GRAYLOG_PORT),
              },
            ],
            hostname: process.env.GRAYLOG_HOSTNAME,
            facility: 'Web API',
            bufferSize: 1400,
          },
          staticMeta: { environment: process.env.NODE_ENV },
        }),
      ],
    }),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  app.use(express.urlencoded({ extended: true }));

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    })
  );

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('PoudlardRP Web API')
    .setDescription('PoudlardRP Web API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
