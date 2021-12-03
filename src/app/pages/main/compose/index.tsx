import React, { FC } from 'react';
import classNames from 'classnames';

import { Button, Display } from 'app/elements';
import { Tweet, MAX_TWEET_LENGTH, validate, ValidateAction } from 'app/utils';

import { DateTimeToggleComponent } from './datetime';
import Style from './style.module.scss';

const COMPOSE_PLACEHOLDER_TEXT = `What's gonna be on your mind?`;

type ComposeComponentProps = {
  tweet?: Tweet;
  send: () => void;
  cancel: () => void;
  draft: () => void;
  schedule: () => void;
  setTweet: (newTweet: Tweet) => void;
}

export const ComposeComponent: FC<ComposeComponentProps> = ({
  tweet,
  send,
  cancel,
  draft,
  schedule,
  setTweet,
}) => {

  const setBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({
      ...tweet,
      body: e.target.value
    });
  };

  const setDate = (newDate: Date | undefined) => {
    setTweet({
      ...tweet,
      date: newDate,
    });
  }

  const renderRemainingCharacterCount = (): JSX.Element => {
    const remainingCharacterCount = tweet?.body ? MAX_TWEET_LENGTH - tweet.body.length : MAX_TWEET_LENGTH;
    const className = classNames(Style.characterCount, {
      [Style.error]: remainingCharacterCount < 0,
    });
    return (
      <div className={className}>
        {remainingCharacterCount}
      </div>
    )
  }

  return (
    <div className={Style.composeHolder}>
      <div className={Style.inputHolder}>
        <textarea
          value={tweet?.body || ''}
          placeholder={COMPOSE_PLACEHOLDER_TEXT}
          onChange={setBody}
        />
        <Display size={['sm', 'md']} className={Style.calendarHolder}>
          <DateTimeToggleComponent
            date={tweet?.date}
            setDate={setDate}
          />
        </Display>
      </div>
      <div className={Style.buttonHolder}>
        <div className={Style.dateTimeInputHolder}>
          <Display size={['lg', 'xl']}>
            <DateTimeToggleComponent
              date={tweet?.date}
              setDate={setDate}
            />
          </Display>
        </div>
        <Display size="sm" className={Style.actionDisplayer}>
          <div className={Style.actionHolder}>
            {renderRemainingCharacterCount()}
            <Button disabled={!validate(tweet, ValidateAction.CANCEL)} className={Style.button} icon="trash" onClick={cancel} secondary />
            {
              tweet?.date ?
                <Button disabled={!validate(tweet, ValidateAction.SCHEDULE)} className={Style.button} icon="clock" onClick={schedule} /> :
                <Button disabled={!validate(tweet, ValidateAction.DRAFT)} className={Style.button} icon="save" onClick={draft} />
            }
          </div>
        </Display>
        <Display size={['md', 'lg', 'xl']} className={Style.actionDisplayer}>
          <div className={Style.actionHolder}>
            {renderRemainingCharacterCount()}
            <Button disabled={!validate(tweet, ValidateAction.CANCEL)} className={Style.button} icon="trash" onClick={cancel} secondary />
            <Button disabled={!validate(tweet, ValidateAction.SEND)} className={Style.button} icon="send" onClick={send} secondary />
            <Button disabled={!validate(tweet, ValidateAction.DRAFT)} className={Style.button} icon="save" onClick={draft} />
            <Button disabled={!validate(tweet, ValidateAction.SCHEDULE)} className={Style.button} icon="clock" onClick={schedule} />
          </div>
        </Display>
      </div>
    </div>
  )
}
