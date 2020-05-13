from flask import Blueprint, session, redirect, url_for, Flask
from authlib.flask.client import OAuth
from config import TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET
from helpers import twitter
from authlib.client import OAuthClient

app = Flask(__name__)
oauth = OAuth(app)

login = Blueprint('login', __name__, template_folder='templates')


def save_request_token(token):
    session['request_token'] = token


def fetch_request_token():
    return session['request_token']


oauth.register(
    name='twitter',
    client_id=TWITTER_CLIENT_ID,
    client_secret=TWITTER_CLIENT_SECRET,
    request_token_url='https://api.twitter.com/oauth/request_token',
    request_token_params=None,
    access_token_url='https://api.twitter.com/oauth/access_token',
    access_token_params=None,
    refresh_token_url=None,
    authorize_url='https://api.twitter.com/oauth/authenticate',
    api_base_url='https://api.twitter.com/1.1/',
    client_kwargs=None,
    save_request_token=save_request_token,
    fetch_request_token=fetch_request_token,
)


# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES:
# EFFECTS: redirects to the twitter page to authorize app
# ------------------------------------------------------------------------------
@login.route('/login', methods=['GET'])
def login_route():
    redirect_uri = url_for('login.auth_route', _external=True)
    return oauth.twitter.authorize_redirect(redirect_uri)

# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES: sets session variable to contain user access token information
# EFFECTS: redirects to the home page
# ------------------------------------------------------------------------------
@login.route('/auth', methods=['GET'])
def auth_route():
    token = oauth.twitter.authorize_access_token()

    # store user credentials
    # user_id = db.load_user(token['user_id'])
    # if user_id is None:
    # 	user_id = db.add_user(resp)

    # update the twitter user info and in the database TODO: only do this if the new data is different / outdated
    user_data = twitter.get_user_data(token)

    # set session variables
    session['user_data'] = user_data
    session['token'] = token

    return redirect(url_for('main.main_route'))
