import React, { FC, useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Container, ContainerLeft, ContainerRight, Splash } from 'app/elements';
import { Tweet, API } from 'app/utils';

import { LibraryComponent } from './library';
import { ComposeComponent } from './compose';
import { HeaderComponent } from './header';

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

const AUTH_0_DOMAIN = process.env.REACT_APP_AUTH_0_DOMAIN || '';
const api = new API(AUTH_0_DOMAIN);

const getLibraryWithTweetRemoved = (tweets: Tweet[], tweet: Tweet) => {
  return tweets.filter(t => t.id !== tweet.id);
}

const getLibraryWithTweetAdded = (tweets: Tweet[], tweet: Tweet) => {
  return [...tweets, tweet];
}

export const PageMain: FC = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [init, setInit] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [compose, setCompose] = useState<ComposeType>(DEFAULT_COMPOSE);

  useEffect(() => {

    const initApiAndReadTweets = async () => {
      if (user) {
        // const claims = await getIdTokenClaims();
        // console.log({ user, claims });
        await api.getAccessToken(user.sub || '', getAccessTokenSilently);
        // await api.readTweets();
      }
    }

    if (!init) {
      if (isAuthenticated) {
        setInit(true);
        initApiAndReadTweets(); // const loadedTweets = ...
        setTweets(TWEETS);
      }
      // else {
      //   console.error('Unable to authenticate');
      //   window.location.replace('/login');
      // }
    }
  }, [user]);

  // Edit

  // set a tweet original and working tweet in the compose
  const setComposeTweet = (tweet: Tweet) => {
    setCompose(() => ({
      workingTweet: { ...tweet },
      originalTweet: { ...tweet },
    }));
  }

  // modify the working tweet in the compose
  const setWorkingTweet = (newTweet: Tweet) => {
    setCompose(() => ({
      workingTweet: { ...newTweet },
      originalTweet: compose.originalTweet
    }));
  }

  const clearCompose = () => {
    setCompose(DEFAULT_COMPOSE);
  }

  const cancelCompose = () => {
    // replace the compose into the library if it exists
    if (compose.originalTweet) {
      addTweetToLibrary(compose.originalTweet);
    }
    // clear the compose
    clearCompose();
  }

  // Library

  const removeTweetFromLibrary = (tweet: Tweet) => {
    setTweets(getLibraryWithTweetRemoved(tweets, tweet));
  }

  const addTweetToLibrary = (tweet: Tweet) => {
    setTweets(() => [...tweets, tweet]);
  }

  const editTweet = (tweet: Tweet) => {
    let newTweets = tweets;
    if (compose.originalTweet) {
      newTweets = getLibraryWithTweetAdded(newTweets, compose.originalTweet);
    }
    newTweets = getLibraryWithTweetRemoved(newTweets, tweet);
    setTweets(newTweets);
    setComposeTweet(tweet);
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
      // TODO: add the id to the tweet
      tweet.date = undefined;
      addTweetToLibrary(tweet);
      clearCompose();
    }
  }

  const scheduleTweet = () => {
    const tweet = compose.workingTweet;
    // TODO: fetch backend
    if (tweet) {
      // TODO: add the id to the tweet
      addTweetToLibrary(tweet);
      clearCompose();
    }
  }

  return (
    <>
      <Splash isOpen={isLoading} />
      <HeaderComponent />
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
            editTweet={editTweet}
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
