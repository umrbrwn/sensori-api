import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../config.js');

const configurations = config()();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configurations.httpPort, '0.0.0.0');
}
bootstrap();
