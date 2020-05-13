import os
import pymongo
from bson import ObjectId
from config import MONGODB_URI


def _connect_to_mongo():
    db = pymongo.MongoClient(MONGODB_URI).get_database()
    return db


def _id_obj(_id):
    return {
        '_id': ObjectId(str(_id['$oid']))
    }


def create_post(post):
    db = _connect_to_mongo()
    result = db.posts.insert_one(post)
    return result.inserted_id


def update_post(post):
    db = _connect_to_mongo()
    query = _id_obj(post['_id']['$oid'])
    del post['_id']
    db.posts.update(query, post)


def delete_post(user_id, _id):
    db = _connect_to_mongo()
    # TODO: check user id too
    db.posts.remove(_id_obj(_id))


def load_posts_by_user_id(user_id):
    db = _connect_to_mongo()
    doc = db.posts.find({'user_id': user_id})
    return doc


def load_post_by_id(_id):
    db = _connect_to_mongo()
    doc = db.posts.find_one(_id_obj(_id))
    return doc


# def get_tweets_by_load_time(load_time):  # TODO:
#     db = connect_to_database()
#     cur = db.cursor()
#     cur.execute(
#         'SELECT tweets.user_id, users.token, users.secret, tweets.id \
#         FROM tweets JOIN (users) ON (users.id=tweets.user_id) \
#         WHERE (tweets.date BETWEEN '2000-01-01' AND '%s') AND tweets.post=1;'
#         % load_time)
#     return cur.fetchall()


# def remove_tweets(load_time):  # TODO:
#     db = connect_to_database()
#     cur = db.cursor()
#     cur.execute(
#         'DELETE \
#         FROM tweets \
#         WHERE (date BETWEEN '2000-01-01' AND ' % s') AND post=1;'
#         % load_time)
#     return cur.fetchall()
