import React, { FC, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Header, Container, ContainerLeft, ContainerRight } from 'app/elements';
import { Tweet } from 'app/utils';

import { LibraryComponent } from './library';
import { ComposeComponent } from './compose';

const TWEETS: Tweet[] = [
  {
    id: 'a',
    date: new Date(),
    body: 'its funny how lol am i right'
  },
  {
    id: 'b',
    date: undefined,
    body: 'cancelled'
  },
  {
    id: 'c',
    date: undefined,
    body: 'you tellin me a shrimp fried this rice'
  },
  {
    id: 'd',
    date: undefined,
    body: 'gonna end it all'
  },
  {
    id: 'e',
    date: new Date(),
    body: 'tweet text here'
  },
  {
    id: 'f',
    date: new Date(),
    body: 'omg shiv'
  },
  {
    id: 'g',
    date: new Date(),
    body: 'whats on your mind, privacy much?'
  },
  {
    id: 'h',
    date: new Date(),
    body: 'ugh'
  },
  {
    id: 'i',
    date: new Date(),
    body: 'SPORTS'
  },
];

type ComposeType = {
  workingTweet?: Tweet;
  originalTweet?: Tweet;
};

const DEFAULT_COMPOSE: ComposeType = {
  workingTweet: undefined,
  originalTweet: undefined,
}

export const PageMain: FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // isLoading

  const [tweets, setTweets] = useState<Tweet[]>(TWEETS);
  const [compose, setCompose] = useState<ComposeType>(DEFAULT_COMPOSE);

  const editTweet = (tweet: Tweet) => {
    setTweets(tweets.filter(t => t.id !== tweet.id));
    setCompose({
      workingTweet: { ...tweet },
      originalTweet: { ...tweet },
    });
  }

  const setWorkingTweet = (newTweet: Tweet) => {
    setCompose({
      workingTweet: { ...newTweet },
      originalTweet: compose.originalTweet
    })
  }

  const remove = () => {
    if (compose.originalTweet) {
      setTweets([...tweets, compose.originalTweet]);
    }
    setCompose(DEFAULT_COMPOSE);
  }

  return (
    <>
      <Header />
      <Container>
        <ContainerLeft>
          <ComposeComponent
            tweet={compose.workingTweet}
            send={() => { console.log('send'); }}
            remove={remove}
            draft={() => { console.log('draft'); }}
            schedule={() => { console.log('schedule'); }}
            setTweet={setWorkingTweet}
          />
        </ContainerLeft>
        <ContainerRight>
          <LibraryComponent tweets={tweets} editTweet={editTweet} />
        </ContainerRight>
      </Container>
    </>
  )
}
