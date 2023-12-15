import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
        `${process.env.FRONTEND_IP}:${process.env.FRONTEND_HOST_PORT}`,
    ],
    credentials: true,
  });
  await app.listen(process.env.BACKEND_PORT_VAR || 3000);
}
bootstrap();
