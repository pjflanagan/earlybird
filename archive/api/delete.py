import os
from flask import Blueprint, request, jsonify, session

from helpers import mongo

delete = Blueprint('delete', __name__, template_folder='templates')

# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES:
# EFFECTS: returns 'valid' 200 as json when tweet is deleted
# ------------------------------------------------------------------------------
@delete.route('api/delete', methods=['POST'])
def delete_route():
    data = request.get_json()
    mongo.delete_post(session['token']['user_id'], data['_id'])
    return jsonify({'message': 'Successfully deleted tweet'}), 200
