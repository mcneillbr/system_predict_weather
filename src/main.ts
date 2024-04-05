import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as env from 'env-var';
import { mongoMemoryServerSetup } from './infra/database/mongodb.server';

const SERVER_PORT = env.get('PORT').default(3000).required().asIntPositive();
const MONGODB_PORT = env.get('MONGODB_PORT').default(27017).required().asIntPositive();
const MONGODB_DB = env.get('MONGODB_DB').default('master').required().asString();

async function startMongoServer() {
  const mongoServer = mongoMemoryServerSetup(MONGODB_PORT, MONGODB_DB);

  process.env['MONGODB_URI'] = await mongoServer.createMongoMemoryServer();

  console.log('mongodb server started'); 
}

async function startHttpServer() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.setGlobalPrefix('api');

  await app.listen(SERVER_PORT);
}

async function bootstrap() {
  await startMongoServer();

  await startHttpServer()
}

bootstrap().then(() => console.info('🔥 🐈 listen on port: ' + SERVER_PORT));
