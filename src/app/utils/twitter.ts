
export const MAX_TWEET_LENGTH = 280;

export type Tweet = {
  id?: string; // if no id then it is new, if id then is is updatable
  body?: string;
  date?: Date;
}

const canRemove = (tweet: Tweet): boolean => {
  return !!tweet.id;
}

const canCancel = (tweet: Tweet): boolean => {
  return canRemove(tweet) || !!tweet.body && tweet.body.length > 0;
}

const canDraft = (tweet: Tweet): boolean => {
  return !!tweet.body && tweet.body.length > 0;
}

const canSend = (tweet: Tweet): boolean => {
  return canDraft(tweet) && !!tweet.body && tweet.body.length < MAX_TWEET_LENGTH;
}

const canSchedule = (tweet: Tweet): boolean => {
  return canSend(tweet) && !!tweet.date;
}

export enum ValidateAction {
  DRAFT = 'draft',
  SEND = 'send',
  SCHEDULE = 'schedule',
  CANCEL = 'cancel',
  REMOVE = 'remove',
}

type ActionValidatorMap = {
  [key in ValidateAction]: (tweet: Tweet) => boolean;
}

export const validate = (tweet: Tweet | undefined, action: ValidateAction): boolean => {
  if (!tweet) {
    return false;
  }
  const actionValidatorMap: ActionValidatorMap = {
    draft: canDraft,
    schedule: canSchedule,
    cancel: canCancel,
    send: canSend,
    remove: canRemove
  };

  return actionValidatorMap[action](tweet);
}
