import React, { FC, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Header, HeaderIcon, Container, ContainerLeft, ContainerRight, Splash } from 'app/elements';
import { Tweet } from 'app/utils'; // API

import { LibraryComponent } from './library';
import { ComposeComponent } from './compose';

const TWEETS: Tweet[] = [
  {
    id: 'a',
    date: new Date('Jan 5, 2022'),
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
    date: new Date('Jan 6, 2022'),
    body: 'tweet text here'
  },
  {
    id: 'f',
    date: new Date('Feb 5, 2022'),
    body: 'omg shiv'
  },
  {
    id: 'g',
    date: new Date('Mar 25, 2022'),
    body: 'whats on your mind, privacy much?'
  },
  {
    id: 'h',
    date: new Date('Aug 11, 2022'),
    body: 'ugh'
  },
  {
    id: 'i',
    date: new Date('Oct 23, 2022'),
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

// const AUTH_0_DOMAIN = process.env.REACT_APP_AUTH_0_DOMAIN || '';
// const api = new API(AUTH_0_DOMAIN);

export const PageMain: FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0(); // getAccessTokenSilently

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [compose, setCompose] = useState<ComposeType>(DEFAULT_COMPOSE);

  useEffect(() => {
    console.log({ user, isAuthenticated });
    if (isAuthenticated) {
      // api.getAccessToken(getAccessTokenSilently);
      setTweets(TWEETS);
    }
    // else {
    //   console.error('Unable to authenticate');
    //   window.location.replace('/login');
    // }
  }, [user]);

  // Edit

  const setComposeTweet = (tweet: Tweet) => {
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

  const clearCompose = () => {
    setCompose(DEFAULT_COMPOSE);
  }

  const cancelCompose = () => {
    if (compose.originalTweet) {
      addTweetToLibrary(compose.originalTweet);
    }
    clearCompose();
  }

  // Library

  const removeTweetFromLibrary = (tweet: Tweet) => {
    setTweets(tweets.filter(t => t.id !== tweet.id));
  }

  const addTweetToLibrary = (tweet: Tweet) => {
    setTweets([...tweets, tweet]);
  }

  // Backend

  const deleteTweet = (tweet: Tweet) => {
    // TODO: fetch backend
    removeTweetFromLibrary(tweet);
  }

  const sendTweet = (tweet: Tweet, callback: (tweet: Tweet) => void) => {
    // TODO: fetch backend and callback on success
    callback(tweet);
  }

  const draftTweet = () => {
    const tweet = compose.workingTweet;
    // TODO: fetch backend
    if (tweet) {
      tweet.date = undefined;
      addTweetToLibrary(tweet);
      clearCompose();
    }
  }

  const scheduleTweet = () => {
    const tweet = compose.workingTweet;
    // TODO: fetch backend
    if (tweet) {
      addTweetToLibrary(tweet);
      clearCompose();
    }
  }

  return (
    <>
      <Splash isOpen={isLoading} />
      <Header>
        {
          user && user.picture && <HeaderIcon src={user.picture} /> || <></>
        }
      </Header>
      <Container>
        <ContainerLeft>
          <ComposeComponent
            tweet={compose.workingTweet}
            send={() => {
              if (compose.workingTweet) {
                sendTweet(compose.workingTweet, clearCompose);
              }
            }}
            cancel={cancelCompose}
            draft={draftTweet}
            schedule={scheduleTweet}
            setTweet={setWorkingTweet}
          />
        </ContainerLeft>
        <ContainerRight>
          <LibraryComponent
            tweets={tweets}
            editTweet={setComposeTweet}
            sendTweet={(tweet: Tweet) => {
              sendTweet(tweet, removeTweetFromLibrary);
            }}
            deleteTweet={deleteTweet}
          />
        </ContainerRight>
      </Container>
    </>
  )
}
