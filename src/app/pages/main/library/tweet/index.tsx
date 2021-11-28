import React, { FC } from 'react';

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
        <div className={Style.buttonHolder}>
          actions
        </div>
      </div>
    </div>
  )
}
