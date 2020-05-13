from config import MODE, PORT
from helpers import bundle
import os
from flask import Flask
import api
import controllers
from flask_assets import Environment

# web: gunicorn -b early-bird-twitter.herokuapp.com:5000 -w 2 -D app:app

app = Flask(__name__, template_folder='templates')

app.secret_key = '\xee\xfb\xfbhT\xa9_?\x9f\xd7P\xfe\xffw\x9b\xd2\xb7\xbf\x05\xc9\xf3k>m'

app.register_blueprint(controllers.main, url_prefix='/')
# app.register_blueprint(controllers.login, url_prefix='/')
app.register_blueprint(controllers.login, url_prefix='/twitter')
app.register_blueprint(controllers.logout, url_prefix='/')

app.register_blueprint(api.tweet, url_prefix='/')
app.register_blueprint(api.tweets, url_prefix='/')
app.register_blueprint(api.create, url_prefix='/')
app.register_blueprint(api.send, url_prefix='/')
app.register_blueprint(api.delete, url_prefix='/')
app.register_blueprint(api.convert, url_prefix='/')
# app.register_blueprint(api.flock, url_prefix='/')

assets = Environment(app)
assets.register('css_all', bundle.css)
assets.register('js_all', bundle.js)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=(MODE == 'DEBUG'))
