import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  logger.log(`Gateway is running on port ${process.env.PORT}`);
}
bootstrap();
