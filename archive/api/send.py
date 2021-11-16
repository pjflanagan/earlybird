import os
from flask import *

from helpers import mongo, twitter, MAX_TWEET_LENGTH, validate

send = Blueprint('send', __name__, template_folder='templates')


# REQUIRES:
# MODIFIES: sends existing tweet and then deletes it from database and s3
# EFFECTS: returns 200 when sent
@send.route('api/send/id', methods=['POST'])
def send_id_route():
    data = request.get_json()

    # get the tweet
    tweet_str = mongo.get_tweet(data['id'])

    # check the length
    error = validate.error_check(tweet_str)
    if error != 0:
        return error

    twitter.send_tweet(tweet_str)

    mongo.delete_tweet(data['id'])

    return jsonify({'message': 'Successfully sent tweet'}), 200


# REQUIRES:
# MODIFIES: sends a new tweet
# EFFECTS: returns 200 when sent
@send.route('api/send/text', methods=['POST'])
def send_text_route():
    data = request.get_json()

    tweet_str = data['text']

    # check the length
    error = validate.error_check(tweet_str)
    if error != 0:
        return error

    twitter.send_tweet(tweet_str)

    return jsonify({'message': 'Successfully sent tweet'}), 200
