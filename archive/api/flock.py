# import os
# from flask import *
# import hashlib

# flock = Blueprint('flock', __name__, template_folder='templates')

# # ------------------------------------------------------------------------------
# # REQUIRES: password is plaintext password
# # MODIFIES:
# # EFFECTS: returns true when password is valid
# # ------------------------------------------------------------------------------
# def verify_password(password):
#     m = hashlib.sha256()
#     m.update(password)
#     h = m.hexdigest()
#     return h == '22251a98cb4b972241bffddff2409fd821cc8521105fd77135ea108a0e50411d'

# # ------------------------------------------------------------------------------
# # REQUIRES: user is user in the flock
# # MODIFIES:
# # EFFECTS:
# # ------------------------------------------------------------------------------
# flock = {
#     'PeterJFlan': ['runcalc', 'this_model', 'TurquoisePeep', 'EarlyBirdHeroku'],
#     'alliecell': ['PeterJFlan']
# }
# def get_flock_users(user):
#     db = connect_to_database()
#     cur = db.cursor()

#     args = flock[user]
#     sql = 'SELECT * FROM users WHERE handle IN (%s)'
#     in_p = ', '.join(list(map(lambda x: '%s', args)))
#     sql = sql % in_p

#     cur.execute(sql, args)
#     return cur.fetchall()

# # ------------------------------------------------------------------------------
# # REQUIRES:
# # MODIFIES: favorites specified flock user's newest tweet
# # EFFECTS: returns the tweet id
# # ------------------------------------------------------------------------------
# @flock.route('api/flock', methods=['GET'])
# def flock_route():
#     data = request.get_json()

#     if not verify_password(data['password']):
#         return 401
#     if data['user'] not in flock:
#         return 401

#     tweet_id = data['url'].rsplit('/', 1)[-1]
#     users = get_flock_users(data['user'])

#     for user in users:
#         auth = tweepy.OAuthHandler(os.getenv('TWITTER_CONSUMER_KEY'), os.getenv('TWITTER_CONSUMER_SECRET'))
#         auth.secure = True
#         auth.set_access_token(user['TOKEN'], user['SECRET'])
#         api = tweepy.API(auth)
#         api.create_favorite(tweet_id)

#     return 200
