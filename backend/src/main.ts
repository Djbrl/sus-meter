  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import * as cors from 'cors';
  import * as fs from 'fs';
  import * as https from 'https';
  
  async function bootstrap() {
 
	   // Load SSL certificate and private key
  const serverOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/sus-meter.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/sus-meter.com/fullchain.pem'),
  };

    const app = await NestFactory.create(AppModule, {serverOptions});

    app.enableCors({
      origin: [
          '*'
          // `${process.env.FRONTEND_IP}:${process.env.FRONTEND_HOST_PORT}`,
      ],
      credentials: true,
    });
    await app.listen(process.env.BACKEND_PORT_VAR || 3000);
  }
  bootstrap();
