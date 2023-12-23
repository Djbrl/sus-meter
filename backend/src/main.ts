import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
        'http://165.22.67.251',
        'http://165.22.67.251:3000',
        'https://165.22.67.251',
        'https://sus-meter.com',
        'http://sus-meter.com',
        'http://localhost:3000',
        `http://localhost:${process.env.FRONTEND_HOST_PORT}`,
    ],
    credentials: true,
  });
  await app.listen(process.env.BACKEND_PORT_VAR || 3000);
}
bootstrap();
