import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
        `http://${process.env.FRONTEND_IP}:3000`,
    ],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
