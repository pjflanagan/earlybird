
import os
import time
import datetime

from helpers import mongo, twitter

import twitter
import requests

import logging

#: python3 job.py


def _get_time():
    return datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')


def send():
    tweets = mongo.get_tweets(_get_time())
    if len(tweets) == 0:
        return

    for tweet in tweets:
        if(valid_tweet(tweet)):  # TODO: make sure its scheduled, and the right length
            # send the tweet
            twitter.send_tweet(tweet['text'], tweet['token'], tweet['secret'])
            # delete the tweet
            mongo.delete(tweet['_id'])

        else:
            # TODO: removes the date on a draft tweet
            mongo.remove_date(tweet['_id'])


# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES: starts the send
# EFFECTS:
# ------------------------------------------------------------------------------
if __name__ == "__main__":
    send()
