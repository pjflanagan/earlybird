
import { GetTokenSilentlyOptions } from '@auth0/auth0-react';

// GET https://ads-api.twitter.com/10/accounts/18ce54d4x5t/draft_tweets?count=1
// GET https://ads-api.twitter.com/10/accounts/18ce54d4x5t/scheduled_tweets?count=1

// import draftTweetsResponseData from './responseData/draft_tweets.json';
// import scheduledTweetsResponseData from './responseData/scheduled_tweets.json';

// TODO: these might be more useful in the backend
// and in the front end I will only get formatted tweets
// type DraftTweetsResponseData = typeof draftTweetsResponseData;
// export type ScheduledTweetsResponseData = typeof scheduledTweetsResponseData;

// type DraftTweet = typeof draftTweetsResponseData.data[0];
// export type ScheduledTweet = typeof scheduledTweetsResponseData.data[0];

const BASE_URL = '/.netlify/functions';

const makeEndpoint = (endpointName: string): string =>
  `${BASE_URL}/${endpointName}`;

const makeEndpointWithParams =
  (endpointName: string, params: URLSearchParams): string =>
    `${makeEndpoint(endpointName)}?${params.toString()}`;

export class API {

  auth0Domain: string;
  auth0UserId = '';
  auth0AccessToken = '';
  twitterAccessToken = '';

  constructor(domain: string) {
    this.auth0Domain = domain;
  }

  async getAccessToken(
    auth0UserSub: string,
    getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string>
  ): Promise<void> {
    this.auth0UserId = auth0UserSub;
    this.auth0AccessToken = await getAccessTokenSilently({});
  }

  async readTweets(): Promise<void> {
    const params = new URLSearchParams();
    params.append('auth0UserId', this.auth0UserId);
    params.append('auth0AccessToken', this.auth0AccessToken);
    const data = await fetch(makeEndpointWithParams('read', params));
    console.log(data);
  }
}
