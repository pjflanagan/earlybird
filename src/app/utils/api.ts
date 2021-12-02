
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

// GET https://ads-api.twitter.com/10/accounts/18ce54d4x5t/draft_tweets?count=1
// GET https://ads-api.twitter.com/10/accounts/18ce54d4x5t/scheduled_tweets?count=1

// const BASE_URL = `/.netlify/functions/`;

import draftTweetsResponseData from './responseData/draft_tweets.json';
import scheduledTweetsResponseData from './responseData/scheduled_tweets.json';

export type DraftTweetsResponseData = typeof draftTweetsResponseData;
export type ScheduledTweetsResponseData = typeof scheduledTweetsResponseData;

export type DraftTweet = typeof draftTweetsResponseData.data[0];
export type ScheduledTweet = typeof scheduledTweetsResponseData.data[0];

export class API {

  auth0Domain = '';
  accessToken = '';

  constructor(domain: string) {
    this.auth0Domain = domain;
  }

  async getAccessToken(
    getAccessTokenSilently: (options: GetTokenSilentlyOptions | undefined) => Promise<string>
  ): Promise<void> {
    this.accessToken = await getAccessTokenSilently({
      audience: `https://${this.auth0Domain}/api/v2/`,
      scope: "read:current_user",
    });
  }

  // async loadTweets() {

  // }
}
