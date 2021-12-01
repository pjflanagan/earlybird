

// GET https://ads-api.twitter.com/10/accounts/18ce54d4x5t/draft_tweets?count=1
// GET https://ads-api.twitter.com/10/accounts/18ce54d4x5t/scheduled_tweets?count=1

const BASE_URL = `/.netlify/functions/`;

import draftTweetsResponseData from './responseData/draft_tweets.json';
import scheduledTweetsResponseData from './responseData/scheduled_tweets.json';

export type DraftTweetsResponseData = typeof draftTweetsResponseData;
export type ScheduledTweetsResponseData = typeof scheduledTweetsResponseData;

export type DraftTweet = typeof draftTweetsResponseData.data[0];
export type ScheduledTweet = typeof scheduledTweetsResponseData.data[0];

export class API {

  auth0Domain: string = '';
  accessToken: string = '';

  constructor() {
  }

  async setDomainAndGetAccessToken(auth0Domain: string, getAccessTokenSilently: any) {
    this.auth0Domain = auth0Domain;
    this.accessToken = await getAccessTokenSilently({
      audience: `https://${auth0Domain}/api/v2/`,
      scope: "read:current_user",
    });
  }
}

// export const LoadTweets = async (getAccessTokenSilently: any) => {
//   try {
//     const accessToken = await getAccessTokenSilently({
//       audience: `https://${domain}/api/v2/`,
//       scope: "read:current_user",
//     });

//     const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

//     const metadataResponse = await fetch(userDetailsByIdUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const { user_metadata } = await metadataResponse.json();

//     return 
//   } catch (e) {
//     console.log(e.message);
//   }
// };
// }

// const gifImage = gifResponseData.data[0].images.downsized_large;
// export type GifImage = typeof gifImage | null;

// const makeWeatherApiEndpoint = ({ lon, lat }: Coordinates): string => {
//   return `/.netlify/functions/drafts?lat=${lat}&lon=${lon}`;
// }

// const makeGifApiEndpoint = (query: string): string => {
//   const queryParams = new URLSearchParams({ query });
//   return `/.netlify/functions/scheduled?${queryParams.toString()}`;
// }

// export async function fetchWeatherData(coords: Coordinates): Promise<WeatherData> {
//   const response = await fetch(makeWeatherApiEndpoint(coords));
//   const data: WeatherResponseData = await response.json();
//   return data.list[0];
// }

// export async function searchGiphy(query: string): Promise<GifList> {
//   const response = await fetch(makeGifApiEndpoint(query));
//   const data: GifResponseData = await response.json();
//   return data.data;
// }
