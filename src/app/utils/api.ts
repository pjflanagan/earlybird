

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

  ready = false;
  auth0Domain: string;
  auth0UserId = '';
  auth0AccessToken = '';
  twitterAccessToken = '';

  constructor(domain: string) {
    this.auth0Domain = domain;
  }

  setAuth0UserSub(auth0UserSub: string): void {
    this.auth0UserId = auth0UserSub;
  }

  setAuth0AccessToken(auth0AccessToken: string): void {
    this.auth0AccessToken = auth0AccessToken;
    this.ready = true;
  }

  makeDefaultParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('auth0UserId', this.auth0UserId);
    params.append('auth0AccessToken', this.auth0AccessToken);
    return params;
  }

  async readTweets(): Promise<void> {
    const params = this.makeDefaultParams();
    const data = await fetch(makeEndpointWithParams('read', params));
    console.log(data);
  }
}
