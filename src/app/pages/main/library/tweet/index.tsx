import React, { FC } from 'react';

import { Nub } from 'app/elements';
import { Tweet } from 'app/utils';

import Style from './style.module.scss';

type TweetComponentProps = {
  tweet: Tweet;
}

export const TweetComponent: FC<TweetComponentProps> = ({
  tweet
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
          <div className={Style.labelHolder}></div>
          <div className={Style.nubHolder}>
            <Nub icon="" onClick={() => { console.log() }} />
            <Nub icon="" onClick={() => { console.log() }} />
            <Nub icon="" onClick={() => { console.log() }} />
          </div>
        </div>
      </div>
    </div>
  )
}
