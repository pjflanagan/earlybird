import React, { FC } from 'react';

import { Button, Display } from 'app/elements';
import { Tweet } from 'app/utils';

import { DateTimeToggleComponent } from './datetime';
import Style from './style.module.scss';

const COMPOSE_PLACEHOLDER_TEXT = `What's on your mind?`;

const canCancel = (tweet: Tweet | undefined): boolean => {
  if (!tweet) {
    return false;
  } else if (tweet.id) {
    return true;
  } else if (tweet.body) {
    return tweet.body.length > 0;
  }
  return false;
}

const canSend = (tweet: Tweet | undefined): boolean => {
  if (!tweet) {
    return false;
  } else if (tweet.body) {
    return tweet.body.length > 0;
  }
  return false;
}

const canSchedule = (tweet: Tweet | undefined): boolean => {
  if (!tweet) {
    return false;
  }
  return canSend(tweet) && !!tweet.date;
}

type ComposeComponentProps = {
  tweet?: Tweet;
  send: () => void;
  remove: () => void;
  draft: () => void;
  schedule: () => void;
  setTweet: (newTweet: Tweet) => void;
}

export const ComposeComponent: FC<ComposeComponentProps> = ({
  tweet,
  send,
  remove,
  draft,
  schedule,
  setTweet,
}) => {

  const setBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({
      ...tweet,
      body: e.target.value
    });
  };

  const setDate = (newDate: Date | undefined) => {
    setTweet({
      ...tweet,
      date: newDate,
    });
  }

  return (
    <div className={Style.composeHolder}>
      <div className={Style.inputHolder}>
        <textarea
          value={tweet?.body}
          placeholder={COMPOSE_PLACEHOLDER_TEXT}
          onChange={setBody}
        />
      </div>
      <div className={Style.buttonHolder}>
        <div className={Style.dateTimeInputHolder}>
          <DateTimeToggleComponent
            date={tweet?.date}
            setDate={setDate}
          />
        </div>
        <Display size="sm" className={Style.actionDisplayer}>
          <div className={Style.actionHolder}>
            <Button disabled={!canCancel(tweet)} className={Style.button} icon="trash" onClick={remove} />
            {
              tweet?.date ?
                <Button disabled={!canSchedule(tweet)} className={Style.button} icon="clock" onClick={schedule} /> :
                <Button disabled={!canSend(tweet)} className={Style.button} icon="save" onClick={draft} />
            }
          </div>
        </Display>
        <Display size={['md', 'lg', 'xl']} className={Style.actionDisplayer}>
          <div className={Style.actionHolder}>
            <Button disabled={!canCancel(tweet)} className={Style.button} icon="trash" onClick={remove} />
            <Button disabled={!canSend(tweet)} className={Style.button} icon="save" onClick={draft} />
            <Button disabled={!canSchedule(tweet)} className={Style.button} icon="clock" onClick={schedule} />
            <Button disabled={!canSend(tweet)} className={Style.button} icon="send" onClick={send} />
          </div>
        </Display>
      </div>
    </div>
  )
}
