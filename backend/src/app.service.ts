import { Inject, Injectable } from '@nestjs/common';
import { SusWords, userProfile, userFollowingData } from './sus-meter.dto';

@Injectable()
export class TwitterScraper {

  private fetchRequestArguments : {
	  "headers": Object,
	  "body":Object,
	  "method":string,
  };
  private susWords: SusWords;
  
	constructor() {
		this.fetchRequestArguments = {
			"headers": {
				"accept": "*/*",
				"accept-language": "fr-FR,fr;q=0.9",
				"authorization": `Bearer ${process.env.BEARER_TOKEN}`,
				"content-type": "application/json",
				"sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"macOS\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"x-client-transaction-id": "cxanQHSoEn47jEplWHNy/GgsfaGfhdEhSHlARwJc39yGdRJY7h+2C0K5tohs+sHuQRp8VHLt50wPSC6C2ueCMtbEKFAwcg",
				"x-client-uuid": "1524bfed-fade-422a-87d5-52e5eeff641c",
				"x-csrf-token": `${process.env.CSRF_TOKEN}`,
				"x-twitter-active-user": "yes",
				"x-twitter-auth-type": "OAuth2Session",
				"x-twitter-client-language": "fr",
				"cookie": "g_state={\"i_l\":0}; kdt=SVJ5RcTYwVIgb8GtyZl73KKtmFl9TXfJkno77Mf4; d_prefs=MToxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw; guest_id_ads=v1%3A170224170705048126; guest_id_marketing=v1%3A170224170705048126; _ga=GA1.2.1117482307.1702243856; _gid=GA1.2.666375936.1702243856; dnt=1; personalization_id=\"v1_zVgSgJ0SJhF1dTTibzYQJA==\"; guest_id=v1%3A170224385812470440; auth_token=5651c79b94db5c96d9d503f8434c3df2c477e8bf; ct0=413fda9169504634dcc48682b2a610a70e3b8b9fcf04635688565e76d89f1b4d19017677df6019d2894d67aeb7171065f6a46ca45c303262b1345568cd74ff99193cda8320f7010d571899234bd0ecb4; lang=fr; twid=u%3D1092099855206543361; twtr_pixel_opt_in=Y; des_opt_in=Y",
				"Referer": "https://twitter.com/TwitterScrapper",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			},
			"body": null,
			"method": "GET"
		};
		this.susWords = new SusWords();
	}

  private createFetchUserIdByUsernameUrl = (username:string) :string =>
  {
		return `https://twitter.com/i/api/graphql/NimuplG1OB7Fd2btCLdBOw/UserByScreenName?variables=%7B%22screen_name%22%3A%22${username}%22%2C%22withSafetyModeUserFields%22%3Atrue%7D&features=%7B%22hidden_profile_likes_enabled%22%3Atrue%2C%22hidden_profile_subscriptions_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22subscriptions_verification_info_is_identity_verified_enabled%22%3Atrue%2C%22subscriptions_verification_info_verified_since_enabled%22%3Atrue%2C%22highlights_tweets_tab_ui_enabled%22%3Atrue%2C%22responsive_web_twitter_article_notes_tab_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D&fieldToggles=%7B%22withAuxiliaryUserLabels%22%3Afalse%7D`;
  }

  private createFetchUserFollowingListUrl = (userId:string, cursor:Array<string>) :string =>
  {
		if (cursor[0] === '-1' && cursor[1] === '-1'){
			return `https://twitter.com/i/api/graphql/Q8uAxT-HrhDA--1E7m3cpA/Following?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_home_pinned_timelines_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Afalse%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_media_download_video_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
		} else {
			return `https://twitter.com/i/api/graphql/Q8uAxT-HrhDA--1E7m3cpA/Following?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A20%2C%22cursor%22%3A%22${cursor[0]}%7C${cursor[1]}%22%2C%22includePromotedContent%22%3Afalse%7D&features=%7B%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_home_pinned_timelines_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Afalse%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_media_download_video_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
		}
  }


  private getUserFollowingListPage = async (userId:string, cursor:Array<string>): Promise <any>|null => {
	  try {
		  const response = await fetch(this.createFetchUserFollowingListUrl(userId, cursor), this.fetchRequestArguments as RequestInit);
		  const jsonData:any = await response.json();
		  if (jsonData.data.user.result === undefined){
			  return null;
			}
			return jsonData.data.user.result.timeline.timeline.instructions.find(instruction => instruction.type === 'TimelineAddEntries');
		} catch (error) {
			console.error('Error in getUserFollowingList:', error);
			return null;
		}
	};

	getUserByUsername = async (username:string): Promise<userProfile|null> => {
		try {
			const response = await fetch(this.createFetchUserIdByUsernameUrl(username),this.fetchRequestArguments as RequestInit);
			const jsonData:any = await response.json();
			if (jsonData.data?.user?.result === undefined){
				return null;
		  }
		  return {
			  userId: jsonData.data.user.result.rest_id,
			  screen_name: jsonData.data.user.result.legacy.screen_name,
			  name: jsonData.data.user.result.legacy.name,
			  description: jsonData.data.user.result.legacy.description,
			  friends_count: jsonData.data.user.result.legacy.friends_count,
			  followers_count: jsonData.data.user.result.legacy.followers_count,
			  profile_picture: jsonData.data.user.result.legacy.profile_image_url_https
		  };
		} catch (error) {
			console.error('Error in getUserIdByUsername:', error);
			return null;
		}
	};

  getUserFollowingList = async (screen_name:string): Promise <userFollowingData|Array<any>> => {
	  let   pagination:number = 1;
	  let   numberOfEntries:number = 0;
	  let   totalEntriesFetched:number = 0;
	  let   nextCursor:Array<string> = ['-1', '-1'];
	  const followingList:Array<userProfile> = []

	  console.log(`Fetching userId for ${screen_name}...`);
	  const userProfile:userProfile = await this.getUserByUsername(screen_name);
	  if (userProfile === null){
		  console.log(`Couldn't fetch userId for ${screen_name}.`)
		  return [];
	  }
	  console.log(`userId for @${screen_name}:`, userProfile.userId);

	  while (nextCursor[0] !== '0' && pagination < 20){
		  const currentPage = await this.getUserFollowingListPage(userProfile.userId, nextCursor);
		  if(currentPage === null){
			  console.log(`Couldn't fetch page ${pagination} from following list for @${screen_name}.`)
			  return [];
		  }

		  numberOfEntries = currentPage.entries.length;
		  totalEntriesFetched += numberOfEntries - 2;
		  console.log(`Fetched ${numberOfEntries} users on page ${pagination}...`)
		  if (numberOfEntries > 2){
			  nextCursor = currentPage.entries[numberOfEntries - 2].content.value.split('|')
		  }

		  currentPage.entries
		  .filter(entry => entry.content.itemContent && entry.content.itemContent.user_results.result?.legacy)
		  .forEach(entry => {
			const legacyData = entry.content.itemContent.user_results.result.legacy;
			const susUser: userProfile = {
			  screen_name: legacyData.screen_name,
			  name: legacyData.name,
			  description: legacyData.description,
			  friends_count: legacyData.friends_count,
			  followers_count: legacyData.followers_count,
			  profile_picture: legacyData.profile_image_url_https,
			};

			if (legacyData.entities && 'url' in legacyData.entities && legacyData.entities.url.urls.length > 0) {
				susUser.link = legacyData.entities.url.urls[0].expanded_url;
			}

			followingList.push(susUser);
		  });
		  pagination++;
	  }

	  console.log("Total number of entries fetched :", totalEntriesFetched, "/", userProfile.friends_count)
	  return {
		list: followingList,
		listOwner: userProfile
	  };
	}

	//TODO : find a better type overlap to handle, switch to NULL potentially
	getSusFollowingFromUser = async (username:string|null):Promise<userFollowingData|Array<any>> => {
		let     susUsers = []
		const   res:any = await this.getUserFollowingList(username);
		if (res.list === undefined){
			return ;
		}
		const followingList:Array<userProfile> = res.list;
		if (followingList.length === 0){
			return [];
		}

		followingList.forEach(user => {
		  let userSusMeter = 0;
		  let triggers = []

		  //SUS KEYWORDS
		  for (const word in this.susWords.susKeywords){
			  if (user.description.includes(this.susWords.susKeywords[word]) || user.name.includes(this.susWords.susKeywords[word])) {
				  userSusMeter += 3;
				  triggers.push(this.susWords.susKeywords[word])
			  }
		  }
		  //POTENTIALLY SUS KEYWORDS
		  for (const word in this.susWords.potentiallySusKeywords){
			  if (user.description.includes(this.susWords.potentiallySusKeywords[word]) || user.name.includes(this.susWords.potentiallySusKeywords[word])) {
				  userSusMeter +=1;
				  triggers.push(this.susWords.potentiallySusKeywords[word])
			  }
		  }
		  //LINKS
		  for (const link in this.susWords.susLinks){
			  if (user.description.includes(this.susWords.susLinks[link])) {
				  userSusMeter += 5;
				  triggers.push(this.susWords.susLinks[link])
			  }
		  }

		  if (userSusMeter > 0){
			  susUsers.push({
				  name: user.name,
				  screen_name: user.screen_name,
				  description: user.description,
				  friends_count: user.friends_count,
				  followers_count: user.followers_count,
				  profile_picture: user.profile_picture,
				  susMeter: userSusMeter,
				  keywords: triggers
			  })
		  }
	  });

	  susUsers.sort((a, b) => b.susMeter - a.susMeter);
	  return {
		list: susUsers,
		listOwner: res.listOwner
	  };
  }
}
