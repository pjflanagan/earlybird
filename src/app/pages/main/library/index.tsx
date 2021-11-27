import React, { FC } from 'react';

import { Tweet } from 'app/utils';

import { TweetComponent } from './tweet';

import Style from './style.module.scss';

type LibraryComponentProps = {
  tweets: Tweet[];
}

export const LibraryComponent: FC<LibraryComponentProps> = ({
  tweets
}) => {

  return (
    <div className={Style.libraryContainer}>
      {
        tweets.map((tweet) => (
          <TweetComponent key={tweet.id} tweet={tweet} />
        ))
      }
    </div>
  )
}
