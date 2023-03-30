import type { FC } from 'react';

import { ReactLocation, Router } from 'react-location';

import { ReactLocationDevtools } from 'react-location-devtools';
import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';

import { routes } from './routes';
import { Root } from './views/Root';

const location = new ReactLocation();

export const App: FC = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Router
        location={location}
        routes={routes}
      >
        <Root />
        <ReactLocationDevtools initialIsOpen={false} />
      </Router>
    </RelayEnvironmentProvider>

  );
};
