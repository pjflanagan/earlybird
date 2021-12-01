import React, { FC, useState } from 'react';

import { Header, Container, ContainerLeft, ContainerRight } from 'app/elements';
import { Tweet } from 'app/utils';

import { LibraryComponent } from './library';
import { ComposeComponent } from './compose';

// eslint-ignore
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const { REACT_APP_ENV } = process.env;
// const composeEnhancers = (REACT_APP_ENV === 'PRD') ? compose : composeWithDevTools;

export const PageMain: FC = () => {

  const [composeTweet, setComposeTweet] = useState<Tweet>();

  // useEffect =>
  // store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  const tweets: Tweet[] = [
    {
      id: 'a',
      date: new Date(),
      body: 'tweet text here'
    },
    {
      id: 'b',
      date: undefined,
      body: 'tweet draft here'
    },
    {
      id: 'c',
      date: undefined,
      body: 'tweet draft here'
    },
    {
      id: 'd',
      date: undefined,
      body: 'tweet draft here'
    },
    {
      id: 'e',
      date: new Date(),
      body: 'tweet text here'
    },
    {
      id: 'f',
      date: new Date(),
      body: 'tweet text here'
    },
    {
      id: 'g',
      date: new Date(),
      body: 'tweet text here'
    },
    {
      id: 'h',
      date: new Date(),
      body: 'tweet text here'
    },
    {
      id: 'i',
      date: new Date(),
      body: 'tweet text here'
    },
  ];

  const remove = () => {
    // TODO: re-add to the library if it has an id
    setComposeTweet(undefined);
  }

  return (
    <>
      {/* TODO: we probably will use redux here because managing an array of tweets might need it */}
      {/* Or maybe when I do this it will just be in PageMain */}
      {/* <Provider store={store}>  */}
      <Header />
      <Container>
        <ContainerLeft>
          <ComposeComponent
            tweet={composeTweet}
            send={() => { console.log('send'); }}
            remove={remove}
            draft={() => { console.log('draft'); }}
            schedule={() => { console.log('schedule'); }}
            setTweet={setComposeTweet}
          />
        </ContainerLeft>
        <ContainerRight>
          <LibraryComponent tweets={tweets} />
        </ContainerRight>
      </Container>
    </>
  )
}
