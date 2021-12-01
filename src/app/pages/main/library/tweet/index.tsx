import React, { FC } from 'react';

import { Pill } from 'app/elements';
import { Tweet } from 'app/utils';

import Style from './style.module.scss';

type TweetComponentProps = {
  editTweet: (tweet: Tweet) => void;
  tweet: Tweet;
}

export const TweetComponent: FC<TweetComponentProps> = ({
  tweet,
  editTweet
}) => {

  return (
    <div className={Style.tweetHolder}>
      <div className={Style.tweet}>
        <div className={Style.bodyHolder}>
          <div className={Style.body}>
            {tweet.body}
          </div>
        </div>
        <div className={Style.actionRow}>
          <div className={Style.labelHolder}>
            <Pill label="Draft" background="purple" icon="clock" />
          </div>
          <div className={Style.nubHolder}>
            <Pill background="none" className={Style.nub} icon="trash" onClick={() => { console.log() }} />
            <Pill background="none" className={Style.nub} icon="pencil" onClick={() => editTweet(tweet)} />
            <Pill background="none" iconColor="purple" className={Style.nub} icon="send" onClick={() => { console.log() }} />
          </div>
        </div>
      </div>
    </div>
  )
}
