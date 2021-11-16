
from .const import MAX_TWEET_LENGTH, MAX_DRAFT_LENGTH, TYPE, ACTION
import hashlib

NO_ERROR = -1
PAST_DATE_ERROR = 0
INVALID_DATE_ERROR = 1
NO_TEXT_ERROR = 2
OVER_LENGTH_ERROR = 3
SAME_TWEET_ERROR = 4
OVER_DRAFT_LENGTH_ERROR = 5
MISSING_ID_ERROR = 6

ERROR_STRINGS = {
    0: 'Tweet cannot be scheduled for the past.',
    1: 'Tweet cannot be scheduled for invalid date.',
    2: 'Tweet contains no text.',
    3: 'Tweet is over ' + str(MAX_TWEET_LENGTH) + ' characters.',
    4: 'Tweet is the same as another tweet.',
    5: 'Tweet draft is over ' + str(MAX_DRAFT_LENGTH) + 'characters.',
    6: 'Tweet is missing an _id.'
}

SUCCESS_STRINGS = {
    'schedule': 'Tweet successfully scheduled.',
    'draft': 'Tweet successfully drafted.',
    'send': 'Tweet sent.'
}


def success_string(success_type):
    return SUCCESS_STRINGS[success_type]


def error_string(error_type):
    return ERROR_STRINGS[error_type]


def _text_hash(text):
    hash = hashlib.md5()
    hash.update(text.encode('utf-8'))
    return hash.hexdigest()


def validate(data):
    action = data['action']
    del data['action']
    data['hash'] = str(_text_hash(data['text']))

    if data['text'] == '':
        return action, data, NO_TEXT_ERROR

    # if the action is schedule or draft and same as another tweet they already have
    # SAME_TWEET_ERROR

    if action == ACTION['SEND'] or data['type'] == TYPE['SCHEDULE']:
        if len(data['text']) > MAX_TWEET_LENGTH:
            return action, data, OVER_LENGTH_ERROR

        # if the action is UPDATE
        # then do something different
        # come on

    if action == ACTION['UPDATE']:
        if '_id' not in data:
            return action, data, MISSING_ID_ERROR

    # if action == TYPE.SCHEDULE:
    # 	if the date is in the past then
    # PAST_DATE_ERROR

    elif data['type'] == TYPE['DRAFT']:
        if len(data['text']) > MAX_DRAFT_LENGTH:
            return action, data, OVER_DRAFT_LENGTH_ERROR

    return action, data, NO_ERROR
