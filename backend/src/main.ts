import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cors from 'cors';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
    // Load SSL certificate and private key
  const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/privkey.pem'),
    cert: fs.readFileSync('/etc/ssl/certs/fullchain.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();
  await app.listen(process.env.BACKEND_PORT_VAR || 3000);
}
bootstrap();
