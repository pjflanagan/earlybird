import React, { FC } from 'react';

import { Tweet } from 'app/utils';

import { TweetComponent } from './tweet';

import Style from './style.module.scss';

type LibraryComponentProps = {
  editTweet: (tweet: Tweet) => void;
  tweets: Tweet[];
}

export const LibraryComponent: FC<LibraryComponentProps> = ({
  editTweet,
  tweets
}) => {

  // TODO: order by date that itll send then drafts at the end

  return (
    <div className={Style.libraryContainer}>
      {
        tweets.map((tweet) => (
          <TweetComponent key={tweet.id} tweet={tweet} editTweet={editTweet} />
        ))
      }
    </div>
  )
}
