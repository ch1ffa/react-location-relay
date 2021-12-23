import { render } from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from './RelayEnvironment';

import { App } from './App';

const RelayApp = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <App/>
    </RelayEnvironmentProvider>
  );
};

render(<RelayApp />, document.getElementById('app'));
