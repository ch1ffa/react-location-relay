import { MakeGenerics, Navigate, Route, RouteMatch } from 'react-location';

import { loadQuery, PreloadedQuery } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';

import { Speakers } from './views/speakers';
import SpeakersQuery from './views/speakers/__generated__/SpeakersQuery.graphql';
import type { SpeakersQuery as SpeakersQueryType } from './views/speakers/__generated__/SpeakersQuery.graphql';

import { Attendees } from './views/attendies';
import AttendeesQuery from './views/attendies/__generated__/AttendeesQuery.graphql';
import type { AttendeesQuery as AttendeesQueryType } from './views/attendies/__generated__/AttendeesQuery.graphql';

import { Sessions } from './views/sessions';
import SessionsQuery from './views/sessions/__generated__/SessionsQuery.graphql';
import type { SessionsQuery as SessionsQueryType } from './views/sessions/__generated__/SessionsQuery.graphql';

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    speakersRef: PreloadedQuery<SpeakersQueryType>,
    attendeesRef: PreloadedQuery<AttendeesQueryType>,
    sessionsRef: PreloadedQuery<SessionsQueryType>,
  };
}>;

export const routes: Route[] = [
  {
    path: '/speakers',
    element: <Speakers />,
    loader: () => ({
      speakersRef: loadQuery(
        RelayEnvironment,
        SpeakersQuery,
        {},
      ),
      onMatch: (match: RouteMatch<LocationGenerics>) => {
        return () => {
          match.data.speakersRef?.dispose();
        };
      },
    }),
  },
  {
    path: '/attendees',
    element: <Attendees />,
    loader: () => ({
      attendeesRef: loadQuery(
        RelayEnvironment,
        AttendeesQuery,
        {},
      ),
      onMatch: (match: RouteMatch<LocationGenerics>) => {
        return () => {
          match.data.attendeesRef?.dispose();
        };
      },
    }),
  },
  {
    path: '/sessions',
    element: <Sessions />,
    loader: () => ({
      sessionsRef: loadQuery(
        RelayEnvironment,
        SessionsQuery,
        {},
      ),
      onMatch: (match: RouteMatch<LocationGenerics>) => {
        return () => {
          match.data.sessionsRef?.dispose();
        };
      },
    }),
  },
  {
    path: '/tracks',
    element: <div>no data...</div>,
  },
  {
    element: <Navigate to="/speakers" />,
  },
];
