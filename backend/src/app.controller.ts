import { Controller, Get, Param, Req } from '@nestjs/common';
import { TwitterScraper } from './app.service';
import { userFollowingData } from './sus-meter.dto';
import { Request } from 'express';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly twitterScraper: TwitterScraper) {}

  @Get('/getSusFollowingForUser/:username')
  async getSusFollowing(
    @Param('username') username: string,
    @Req() req: Request,
  ): Promise<userFollowingData | Array<any>> {
    // Log the request to a file
    this.logRequest(req);

    return await this.twitterScraper.getSusFollowingFromUser(username);
  }

  @Get('/getFollowingForUser/:username')
  async getFollowing(
    @Param('username') username: string,
    @Req() req: Request,
  ): Promise<userFollowingData | Array<any>> {
    // Log the request to a file
    this.logRequest(req);

    return await this.twitterScraper.getUserFollowingList(username);
  }

  private logRequest(req: Request): void {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${
      req.originalUrl
    } - ${req.ip}\n`;

    // Log the request to a file (e.g., request.log)
    fs.appendFileSync('request.log', logEntry);
  }
}
