import os
from flask import Blueprint, request, jsonify, session
from helpers import MAX_TWEET_LENGTH, TYPE, ACTION, mongo, validate, date

create = Blueprint('create', __name__, template_folder='templates')

# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES:
# EFFECTS: returns tweet data in form of html
# ------------------------------------------------------------------------------


@create.route('api/create', methods=['POST'])
def create_route():
    data = request.get_json()

    print(data)

    if 'token' not in session:
        return 400

    data['user_id'] = session['token']['user_id']

    action, data, err = validate.validate(data)
    if err is not validate.NO_ERROR:
        return jsonify({
            'message': validate.error_string(err)
        }), 400

    if action == ACTION['CREATE']:
        id = mongo.create_post(data)
        data['_id'] = {
            "$oid": str(id)
        }
    elif action == ACTION['UPDATE']:
        mongo.update_post(data)

    message = validate.success_string(data['type'])

    return jsonify({
        'data': data,
        'message': message
    }), 200
