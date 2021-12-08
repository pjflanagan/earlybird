import React, { FC, useState } from 'react';

import { Tweet } from 'app/utils';

import { TweetComponent } from './tweet';
import { FilterComponent, FilterOption } from './filter';

import Style from './style.module.scss';

type LibraryComponentProps = {
  editTweet: (tweet: Tweet) => void;
  sendTweet: (tweet: Tweet) => void;
  deleteTweet: (tweet: Tweet) => void;
  tweets: Tweet[];
  hasLoadedTweets: boolean;
}

export const LibraryComponent: FC<LibraryComponentProps> = ({
  editTweet,
  sendTweet,
  deleteTweet,
  tweets,
  hasLoadedTweets,
}) => {

  const [filterBy, setFilterBy] = useState<FilterOption>(FilterOption.ALL);

  const renderEmptyLibrary = (): JSX.Element => {
    // TODO: a nicer placeholder would have this text where the filter is 
    // and a couple "ghost" tweets
    return (
      <div className={Style.placeholder}>
        {
          hasLoadedTweets ? 'No tweets' : 'Loading tweets...'
        }
      </div>
    )
  };

  const drafts = tweets.filter(t => !t.date);
  const scheduled = tweets.filter(t => !!t.date).sort((a, b) => {
    return (a.date?.getTime() || 0) - (b.date?.getTime() || 0);
  });

  const displayTweets = (() => {
    switch (filterBy) {
      case FilterOption.SCHEDULED:
        return [...scheduled];
      case FilterOption.DRAFTS:
        return [...drafts];
      case FilterOption.ALL:
      default:
        return [...scheduled, ...drafts];
    }
  })();

  return (
    <div className={Style.libraryContainer}>
      <FilterComponent filterBy={filterBy} setFilterBy={setFilterBy} />
      {
        displayTweets.length === 0
          ? renderEmptyLibrary()
          : displayTweets.map((tweet) => (
            // TODO: there should occasionally be year bars in here and a bar that separates drafts
            <TweetComponent
              key={tweet.id}
              tweet={tweet}
              edit={editTweet}
              send={sendTweet}
              remove={deleteTweet}
            />
          ))
      }
    </div>
  )
}
