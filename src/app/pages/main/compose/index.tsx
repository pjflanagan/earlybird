import React, { FC } from 'react';

import { Tweet } from 'app/utils';

import { DateTimeToggleComponent } from './datetime';
import Style from './style.module.scss';

const COMPOSE_PLACEHOLDER_TEXT = `What's on your mind?`

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

  const setDate = (newDate: Date) => {
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
        <div className={Style.actionHolder}>
          actions
          {/* remove */}
          {/* draft */}
          {/* schedule */}
          {/* send */}
        </div>
      </div>
    </div>
  )
}
