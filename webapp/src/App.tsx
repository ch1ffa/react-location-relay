import type { FC } from 'react';

import { ReactLocation, Router } from 'react-location';

import { ReactLocationDevtools } from 'react-location-devtools';

import { routes } from './routes';
import { Root } from './views/Root';

const location = new ReactLocation();

export const App: FC = () => {
  return (
    <Router
      location={location}
      routes={routes}
    >
      <Root />
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
};
