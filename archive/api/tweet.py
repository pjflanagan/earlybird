import os
from flask import Blueprint, request, jsonify, session
from bson.json_util import dumps
import datetime
from helpers import TYPE, date, mongo

tweet = Blueprint('tweet', __name__, template_folder='templates')
tweets = Blueprint('tweets', __name__, template_folder='templates')


# REQUIRES:
# MODIFIES:
# EFFECTS: all the users tweets json
@tweets.route('api/tweets', methods=['GET'])
def tweets_route():
    tweets = mongo.load_posts_by_user_id(session['token']['user_id'])
    return_data = {
        'data': {
            'tweets': tweets
        },
        'message': 'Loaded tweets.'
    }
    return dumps(return_data), 200

# ------------------------------------------------------------------------------
#  TWEET
# ------------------------------------------------------------------------------

# REQUIRES:
# MODIFIES:
# EFFECTS: tweet json for given tweet id
@tweet.route('api/tweet', methods=['GET'])
def tweet_route():
    id = request.args.get('id')

    tweet = mongo.get_tweet(id)

    return_data = {
        'tweet': tweet
    }

    return jsonify(return_data), 200
