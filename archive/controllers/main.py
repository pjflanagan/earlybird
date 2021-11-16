# coding: utf-8
import os
from flask import Blueprint, session, render_template
import requests
from urllib.parse import urlparse
import json
from helpers import twitter

main = Blueprint('main', __name__, template_folder='templates',
                 static_folder='static')

# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES:
# EFFECTS: returns the index page populated with tweets and user data
# ------------------------------------------------------------------------------
@main.route('/')
def main_route():
    # if not logged in redirect to login route
    if 'token' not in session:
        return render_template('login.html')

    if 'user_data' not in session:
        session['user_data'] = twitter.get_user_data(session['token'])

    context = session['user_data']

    return render_template('index.html', **context)
