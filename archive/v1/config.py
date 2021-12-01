import os

APP_NAME = 'earlybird'
TWITTER_CLIENT_ID = os.getenv('TWITTER_CLIENT_ID')
TWITTER_CLIENT_SECRET = os.getenv('TWITTER_CLIENT_SECRET')
MODE = os.getenv('MODE')
PORT = int(os.getenv('PORT', 5000))
MONGODB_URI = os.getenv('MONGODB_URI')
DATABASE_URL = os.getenv('DATABASE_URL')
DATABASE_NAME = os.getenv('DATABASE_NAME')
