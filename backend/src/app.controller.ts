import { Controller, Get, Param } from '@nestjs/common';
import { TwitterScraper } from './app.service';
import { userFollowingData } from './sus-meter.dto';

@Controller()
export class AppController {
	constructor( private readonly twitterScraper: TwitterScraper ) {}

  @Get('/getSusFollowingForUser/:username')
  async getSusFollowing(@Param('username') username: string): Promise<userFollowingData|Array<any>> {
    return await this.twitterScraper.getSusFollowingFromUser(username);
  }

  @Get('/getFollowingForUser/:username')
  async getFollowing(@Param('username') username: string): Promise<userFollowingData|Array<any>> {
    return await this.twitterScraper.getUserFollowingList(username);
  }
}

//clean  up all types in the api
//clean up the code
//redo with vite
//connect to frontend
//push to git