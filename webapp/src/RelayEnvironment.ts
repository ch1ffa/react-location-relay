import {
  Store,
  Network,
  Environment,
  RecordSource,
  Observable,
} from 'relay-runtime';

import type {
  FetchFunction,
  GraphQLResponse,
  SubscribeFunction,
} from 'relay-runtime';

import { createClient } from 'graphql-ws';

import { meros } from 'meros/browser';

/**
 * Relay requires developers to configure a "fetch" function that tells Relay how to load
 * the results of GraphQL queries from your server (or other data source). See more at
 * https://relay.dev/docs/en/quick-start-guide#relay-environment.
 */
const fetchQuery: FetchFunction = (params, variables) => {
  return Observable.create(sink => {
    (async () => {

      const response = await fetch('http://localhost:8080/graphql', {
        body: JSON.stringify({
          query: params.text,
          variables,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const parts = await meros<GraphQLResponse>(response);

      if (isAsyncIterable(parts)) {
        for await (const part of parts) {
          if (!part.json) {
            sink.error(new Error('Failed to parse part as json.'));
            break;
          }

          const result = part.body;

          // Realyism
          if ('hasNext' in result) {
            /* eslint-disable */
            // @ts-ignore
            if (!result.extensions) result.extensions = {};
            // @ts-ignore
            result.extensions.is_final = !result.hasNext;
            // @ts-ignore
            delete result.hasNext;
            /* eslint-enable */
          }

          sink.next(result);
        }
      } else {

        const json = await parts.json();

        if (Array.isArray(json.errors)) {
          const errorsMessage: string = json.errors
            .filter((error: { message?: string; }) => error?.message !== undefined)
            .map((error: { message: string; }) => error.message).join('\n');
          sink.error(new Error(errorsMessage));
        }

        sink.next(json);
      }

      sink.complete();
    })();
  });
};

function isAsyncIterable(input: unknown): input is AsyncIterable<unknown> {
  return (
    typeof input === 'object' &&
		input !== null &&
		// Some browsers still don't have Symbol.asyncIterator implemented (iOS Safari)
		// That means every custom AsyncIterable must be built using a AsyncGeneratorFunction
		// (async function * () {})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		((input as any)[Symbol.toStringTag] === 'AsyncGenerator' ||
			Symbol.asyncIterator in input)
  );
}

const subscriptionClient = createClient({
  url: 'ws://localhost:8080/graphql'
});

const subscribe: SubscribeFunction = (
  operation,
  variables,
): Observable<any> => {
  return Observable.create(sink => {
    return subscriptionClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text!,
        variables,
      },
      sink
    );
  });
};

const network = Network.create(fetchQuery, subscribe);

// Export a singleton instance of Relay Environment configured with our network layer:
export const RelayEnvironment = new Environment({
  network: network,
  store: new Store(new RecordSource(), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  }),
});

