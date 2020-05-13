
import pymysql
from urllib.parse import urlparse
import sys
import os
from config import DATABASE_URL, DATABASE_NAME

algorithm = 'sha512'

# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES:
# EFFECTS: returns db, a connection to database
# ------------------------------------------------------------------------------


def _connect_to_database():
    url = urlparse.urlparse(DATABASE_URL)
    options = {
        'host': url.hostname,
        'user': url.username,
        'passwd': url.password,
        # TODO: can be paresed out of url not sure why it hasn't worked before
        'db': DATABASE_NAME
    }
    db = PyMySQL.connect(**options)
    db.autocommit(True)
    return db

# ------------------------------------------------------------------------------
# REQUIRES: id is a user id
# MODIFIES:
# EFFECTS: loads access token information from database
# ------------------------------------------------------------------------------


def load_user(user_id):
    db = _connect_to_database()
    cur = db.cursor()
    cur.execute("SELECT id FROM users WHERE ID=%s" % user_id)
    data = cur.fetchall()
    if len(data) > 0:
        return data[0]["id"]
    return None

# ------------------------------------------------------------------------------
# REQUIRES: at is access token information
# MODIFIES: adds user access token information to database
# EFFECTS:
# ------------------------------------------------------------------------------


def add_user(at):
    db = _connect_to_database()
    cur = db.cursor()
    cur.execute(
        # TODO: auto store last update time (only reload/save screen_name and whatnot if enough time has past)
        "INSERT INTO users (id, token, secret) VALUES('%s,'%s','%s')"
        % (at["user_id"], at["oauth_token"], at["oauth_token_secret"]))
    cur.execute("SELECT LAST_INSERT_ID();")
    return
