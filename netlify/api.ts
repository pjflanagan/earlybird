import fetch from 'node-fetch';

const { AUTH_0_DOMAIN } = process.env;

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
    response = await fetch(endpoint);
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
) => {
  let response;

  try {
    response = await fetch(
      `https://${AUTH_0_DOMAIN}/api/v2/users/${auth0UserId}`,
      {
        headers: { authorization: `Bearer ${auth0AccessToken}` }
      });
  } catch (e) {
    console.log(e);
  }

  const userData = await response.json();
  return userData.identities[0].access_token;
}