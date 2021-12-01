# https://flask-assets.readthedocs.io/en/latest/

from flask_assets import Bundle

css = Bundle(
    'css/main.css',
    'css/navbar.css',
    'css/compose.css',
    'css/tweets.css',
    'css/footer.css',
    # 'css/ad.css',
    # filters='cssmin',
    output='gen/packed.css'
)

js = Bundle(
    'js/const.js',
    'js/main.js',
    # plugins
    'js/plugins/lodash.core.js',
    # classes
    'js/classes/tweet.js',
    'js/classes/api.js',
    # controllers
    'js/controllers/header.js',
    'js/controllers/compose.js',
    'js/controllers/tweet.js',

    # filters='jsmin'
    output='gen/packed.js'
)
