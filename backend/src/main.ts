import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
        'http://165.22.67.251:3000',
        'http://localhost:3000',
        `http://localhost:${process.env.FRONTEND_HOST_PORT}`,
    ],
    credentials: true,
  });
  await app.listen(process.env.BACKEND_PORT_VAR || 3000);
}
bootstrap();
