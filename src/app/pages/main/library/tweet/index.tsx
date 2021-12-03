import React, { FC } from 'react';

import { Pill, Display } from 'app/elements';
import { Tweet } from 'app/utils';

import Style from './style.module.scss';

type TweetComponentProps = {
  editTweet: (tweet: Tweet) => void;
  tweet: Tweet;
}

const formatDate = (date: Date): string | undefined => {
  return date.toLocaleString('en-US', {
    day: 'numeric',
    // year: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export const TweetComponent: FC<TweetComponentProps> = ({
  tweet,
  editTweet
}) => {

  return (
    <div className={Style.tweetHolder}>
      <div className={Style.tweet}>
        <Display size="sm" className={Style.dateHolderSmall}>
          {
            tweet.date
              ? <Pill label={formatDate(tweet.date)} background="purple" icon="clock" />
              : <Pill label="Draft" background="grey" icon="save" />
          }
        </Display>
        <div className={Style.bodyHolder}>
          <div className={Style.body}>
            {tweet.body}
          </div>
        </div>
        <div className={Style.actionRow}>
          <div className={Style.labelHolder}>
            <Display size={['md', 'lg', 'xl']}>
              {
                tweet.date
                  ? <Pill label={formatDate(tweet.date)} background="purple" icon="clock" />
                  : <Pill label="Draft" background="grey" icon="save" />
              }
            </Display>
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
