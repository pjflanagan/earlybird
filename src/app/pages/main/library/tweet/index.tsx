import React, { FC } from 'react';

import { Tweet } from 'app/utils';

import Style from './style.module.less';

type TweetComponentProps = {
  tweet: Tweet;
}

export const TweetComponent: FC<TweetComponentProps> = ({
  tweet
}) => {

  return (
    <div className={Style.tweetHolder}>
      <div className={Style.tweet}>
        {tweet.body}
      </div>
    </div>
  )
}
