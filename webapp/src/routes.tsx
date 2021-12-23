import { MakeGenerics, Navigate, Route, RouteMatch } from 'react-location';

import { loadQuery, PreloadedQuery } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';
import { Speakers } from './views/speakers';
import type { SpeakersQuery as SpeakersQueryType } from './views/speakers/__generated__/SpeakersQuery.graphql';
import SpeakersQuery from './views/speakers/__generated__/SpeakersQuery.graphql';

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    speakersRef: PreloadedQuery<SpeakersQueryType>,
  };
}>;

export const routes: Route[] = [
  {
    path: '/speakers',
    element: <Speakers/>,
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
    path: '/attendies',
    element: <div>no data...</div>,
  },
  {
    path: '/sessions',
    element: <div>no data...</div>,
  },
  {
    path: '/tracks',
    element: <div>no data...</div>,
  },
  {
    element: <Navigate to="/speakers" />,
  },
];
