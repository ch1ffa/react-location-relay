import { FC, Suspense } from 'react';
import { usePreloadedQuery, graphql } from 'react-relay';

import type { LocationGenerics } from '@/routes';
import { useMatch } from 'react-location';
import { SpeakersList } from './SpeakersList';

import { List } from 'react-content-loader';

export const Speakers: FC = () => {

  const {
    data: { speakersRef },
  } = useMatch<LocationGenerics>();

  if (speakersRef === undefined) {
    return null;
  }

  const speakers = usePreloadedQuery(
    graphql`
      query SpeakersQuery {
        ...SpeakersList_query @arguments(first: 10)
      }
    `,
    speakersRef,
  );

  return (
    <Suspense fallback={<List />}>
      <SpeakersList queryRef={speakers} />
    </Suspense>
  );
};
