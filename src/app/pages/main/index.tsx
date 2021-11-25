import React, { FC } from 'react';

import { Header, Container, ContainerLeft, ContainerRight } from 'app/elements';
import { Tweet } from 'app/utils';

import { LibraryComponent } from './library';

export const PageMain: FC = () => {

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
  ]

  return (
    <>
      <Header />
      <Container>
        <ContainerLeft>Compose Sidebar</ContainerLeft>
        <ContainerRight>
          <LibraryComponent tweets={tweets} />
        </ContainerRight>
      </Container>
    </>
  )
}
