import { FC, Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay';

import graphql from 'babel-plugin-relay/macro';
import type { LocationGenerics } from '@/routes';
import { useMatch } from 'react-location';
import { SpeakersList } from './SpeakersList';

import { tw } from 'twind';

import { List } from 'react-content-loader';

export const Speakers: FC = () => {

  const {
    data: { speakersRef },
  } = useMatch<LocationGenerics>();

  if (speakersRef === undefined) {
    return null;
  }

  const queryRef = usePreloadedQuery(
    graphql`
      query SpeakersQuery {
        ...SpeakersList_query @arguments(first: 10)
      }
    `,
    speakersRef,
  );

  return (
    <>
      <div className={tw`text-3xl p-2`}>Speakers</div>
      <Suspense fallback={<List />}>
        <SpeakersList queryRef={queryRef} />
      </Suspense>
    </>
  );
};
