import { FC, Suspense } from 'react';
import { usePreloadedQuery, graphql } from 'react-relay';

import type { LocationGenerics } from '@/routes';
import { useMatch } from 'react-location';
import { SessionsList } from './SessionsList';

import { List } from 'react-content-loader';

export const Sessions: FC = () => {

  const {
    data: { sessionsRef },
  } = useMatch<LocationGenerics>();

  if (sessionsRef === undefined) {
    return null;
  }

  const sessions = usePreloadedQuery(
    graphql`
      query SessionsQuery {
        ...SessionsList_query @arguments(first: 10)
      }
    `,
    sessionsRef,
  );

  return (
    <Suspense fallback={<List />}>
      <SessionsList queryRef={sessions} />
    </Suspense>
  );
};
