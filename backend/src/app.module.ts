import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TwitterScraper } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TwitterScraper],
})
export class AppModule {}
