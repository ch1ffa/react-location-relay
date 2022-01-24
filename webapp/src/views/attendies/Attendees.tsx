import { FC, Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay';

import graphql from 'babel-plugin-relay/macro';
import type { LocationGenerics } from '@/routes';
import { useMatch } from 'react-location';
import { AttendeesList } from './AttendeesList';

import { List } from 'react-content-loader';

export const Attendees: FC = () => {

  const {
    data: { attendeesRef },
  } = useMatch<LocationGenerics>();

  if (attendeesRef === undefined) {
    return null;
  }

  const attendees = usePreloadedQuery(
    graphql`
      query AttendeesQuery {
        ...AttendeesList_query @arguments(first: 10)
      }
    `,
    attendeesRef,
  );

  return (
    <Suspense fallback={<List />}>
      <AttendeesList queryRef={attendees} />
    </Suspense>
  );
};
