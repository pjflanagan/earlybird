import os
from flask import Blueprint, request, jsonify

import datetime


convert = Blueprint('convert', __name__, template_folder='templates')

# ------------------------------------------------------------------------------
# REQUIRES: id is a number
# MODIFIES: converts a tweet from a draft to a scheduled or vice versa in database
# EFFECTS: returns the tweet id
# ------------------------------------------------------------------------------


def convert_tweet(data):
    # db = connect_to_database()
    # cur = db.cursor()
    # val = 'false' if data['type']=='draft' else 'true'
    # cur.execute('UPDATE tweets SET post=%s WHERE id=%s AND user_id=%s;' % (val, data['id'], session['user_id']))
    return data['id']

# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES:
# EFFECTS: returns 'valid' 200 as json when tweet is converted
# ------------------------------------------------------------------------------
@convert.route('api/convert', methods=['PUT'])
def convert_route():
    data = request.get_json()
    convert_tweet(data)
    return jsonify({'message': 'Successfully converted tweet'}), 200
