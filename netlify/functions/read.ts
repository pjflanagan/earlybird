import { Handler } from '@netlify/functions';
import axios from 'axios';

import { errorResponse, getTwitterUserAccessToken } from '../api';

// const { TWITTER_API_KEY } = process.env;

const makeScheduledEndpoint = (accountId: string): string => {
  // const params = new URLSearchParams({
  //   count,
  //   cursor
  // });
  return `https://ads-api.twitter.com/10/accounts/${accountId}/scheduled_tweets`;
}

const makeDraftEndpoint = (accountId: string): string => {
  // const params = new URLSearchParams({
  //   count,
  //   cursor
  // });
  return `https://ads-api.twitter.com/10/accounts/${accountId}/draft_tweets`;
}

const handler: Handler = async (event, context) => {
  const { auth0UserId, auth0AccessToken } = event.queryStringParameters;

  if (!auth0AccessToken || !auth0UserId) {
    return errorResponse({
      statusCode: 402,
      message: 'Request is missing auth0AccessToken or auth0UserId param'
    });
  }

  const [twitterUserId, twitterAccessToken, error] = await getTwitterUserAccessToken(auth0UserId, auth0AccessToken);
  if (error) {
    return errorResponse(error);
  }

  let responses;
  const scheduleEndpoint = makeScheduledEndpoint(twitterUserId);
  const draftEndpoint = makeDraftEndpoint(twitterUserId);
  const headers = {
    authorization: `Bearer ${twitterAccessToken}`,
  };

  try {
    responses = await Promise.all([
      axios({
        method: 'GET',
        url: scheduleEndpoint,
        headers
      }),
      axios({
        method: 'GET',
        url: draftEndpoint,
        headers
      }),
    ]);
  } catch (e) {
    return errorResponse(e);
  }

  const response = responses.map(resp => responses.json())

  // TODO: format responses

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
}

export { handler };
