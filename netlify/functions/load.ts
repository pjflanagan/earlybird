import { Handler } from '@netlify/functions';

import { errorResponse } from '../api';

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
  const { query } = event.queryStringParameters;
  const { accountId, accountAccessToken } = query;
  const scheduleEndpoint = makeScheduledEndpoint(accountId);
  const draftEndpoint = makeDraftEndpoint(accountId);
  let responses;

  try {
    responses = await Promise.all([
      fetch(scheduleEndpoint),
      fetch(draftEndpoint),
    ]);
  } catch (e) {
    return errorResponse(e);
  }

  console.log(responses);

  // TODO: format responses

  return {
    statusCode: 200,
    body: JSON.stringify(await responses.json())
  };
}

export { handler };
