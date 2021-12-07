import axios from 'axios';

const { AUTH_0_DOMAIN } = process.env;

type Error = {
  statusCode: number;
  message: string;
} | null;

export const errorResponse = (e) => {
  return {
    statusCode: e.statusCode || 500,
    body: JSON.stringify({
      error: e.message
    })
  }
}

export const baseFetchEndpoint = async function (endpoint) {
  let response;

  try {
    response = await axios.get(endpoint);
  } catch (e) {
    return errorResponse(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await response.json())
  };
}

export const getTwitterUserAccessToken = async (
  auth0UserId: string,
  auth0AccessToken: string,
): Promise<[string, string, Error]> => {
  let response;

  console.log({ auth0UserId, auth0AccessToken });

  try {
    response = await axios({
      method: 'GET',
      url: `https://${AUTH_0_DOMAIN}/api/v2/users/${auth0UserId}`,
      headers: { authorization: `Bearer ${auth0AccessToken}` }
    });
  } catch (e) {
    // const errorMessage = 'Error accessing twitter api';
    // console.log('ERROR: [getTwitterUserAccessToken]', errorMessage, e);
    return ['', '', e as Error];
  }

  const userData = response.data;

  console.log({
    userData
  });

  const { user_id, access_token } = userData.identities.find(
    (i) => i.connection === 'twitter'
  );
  return [user_id, access_token, null];
}