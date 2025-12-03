export type MovieEmptyKey =
  | 'idle'
  | 'succeeded'
  | 'failed-not-found'
  | 'failed-generic';

export interface EmptyMessage {
  title: string;
  description: string;
}

export const EMPTY_STATE_MESSAGES = {
  idle: {
    title: 'Search For Movies',
    description:
      'Start by searching for your favorite movies using the search bar above!',
  },
  succeeded: {
    title: 'No Movies Found',
    description:
      "It seems we couldn't find any movies matching your search. Please try searching for something else!",
  },
  'failed-not-found': {
    title: 'No Movies Found',
    description:
      "It seems we couldn't find any movies matching your search. Please try searching for something else!",
  },
  'failed-generic': {
    title: 'Something Went Wrong',
    description: "We're sorry, something went wrong. Please try again later.",
  },
};
