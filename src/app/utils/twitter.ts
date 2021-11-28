
export const TWEET_LENGTH = 280;

export type Tweet = {
  id?: string; // if no id then it is new, if id then is is updatable
  body: string;
  date?: Date;
}
