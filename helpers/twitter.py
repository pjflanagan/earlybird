import os
import tweepy

from config import TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET


def _get_api(token):
    auth = tweepy.OAuthHandler(TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET)
    auth.secure = True
    auth.set_access_token(token['oauth_token'], token['oauth_token_secret'])
    api = tweepy.API(auth)
    return api


def get_user_data(token):
    api = _get_api(token)
    user = api.get_user(token['user_id'])
    return {
        'icon_url': user.profile_image_url_https.replace('normal', 'bigger'),
        'full_name': user.name,
        'handle': user.screen_name
    }


def send_tweet(token):
    api = _get_api(token)
    api.update_status(tweet_str)

# get drafts
# delete draft (for porting or sending)
