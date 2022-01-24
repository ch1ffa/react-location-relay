import type { FC } from 'react';
import { usePaginationFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Session } from './Session';
import { tw } from 'twind';
import type { SessionsList_query$key } from './__generated__/SessionsList_query.graphql';
import type { SessionsList_queryFragment } from './__generated__/SessionsList_queryFragment.graphql';

interface ISessionsList{
  queryRef: SessionsList_query$key;
}

export const SessionsList: FC<ISessionsList> =  ({ queryRef }) => {
  const { data, loadNext, hasNext } = usePaginationFragment<SessionsList_queryFragment, SessionsList_query$key>(
    graphql`
      fragment SessionsList_query on Query
        @argumentDefinitions(
          first: { type: "Int!" }
          after: { type: "String" }
        )
        @refetchable(queryName: "SessionsList_queryFragment") {
        sessions(
          first: $first,
          after: $after
        ) @connection(key: "SessionsList_sessions") {
          edges {
            node {
              ...Session_session @defer
            }
          }
        }
      }
    `,
    queryRef,
  );

  const sessions = data.sessions?.edges?.map(edge => edge?.node) ?? [];

  return (
    <>
      <div className={tw`flex`}>
        <div className={tw`text-2xl p-2`}>Sessions</div>
      </div>
      <ul>
        { sessions.length
          ? sessions.map((session, i) => {
            return (
              <li key={i} className={tw`p-2 hover:bg-gray-100`}>
                <Session queryRef={session} index={++i} />
              </li>
            );
          })
          : <div>No data</div>
        }
      </ul>
      {
        hasNext && (
          <button
            className={tw`py-1 px-2 ml-2 text-xs bg-blue-500 text-white rounded`}
            onClick={() => loadNext(10)}
          >
            More
          </button>
        )
      }
    </>
  );
};
