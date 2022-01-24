import type { FC } from 'react';
import { usePaginationFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Attendee } from './Attendee';
import { tw } from 'twind';
import type { AttendeesList_queryFragment } from './__generated__/AttendeesList_queryFragment.graphql';
import type { AttendeesList_query$key } from './__generated__/AttendeesList_query.graphql';

interface IAttendeesList {
  queryRef: AttendeesList_query$key;
}

export const AttendeesList: FC<IAttendeesList> =  ({ queryRef }) => {
  const { data, loadNext, hasNext } = usePaginationFragment<AttendeesList_queryFragment, AttendeesList_query$key>(
    graphql`
      fragment AttendeesList_query on Query
        @argumentDefinitions(
          first: { type: "Int!" }
          after: { type: "String" }
        )
        @refetchable(queryName: "AttendeesList_queryFragment") {
        attendees(
          first: $first,
          after: $after
        ) @connection(key: "AttendeesList_attendees") {
          edges {
            node {
              ...Attendee_attendee @defer
            }
          }
        }
      }
    `,
    queryRef,
  );

  const attendees = data.attendees?.edges?.map(edge => edge?.node) ?? [];

  return (
    <>
      <div className={tw`flex`}>
        <div className={tw`text-2xl p-2`}>Attendees</div>
      </div>
      <ul>
        { attendees.length
          ? attendees.map((attendee, i) => {
            return (
              <li key={i} className={tw`p-2 hover:bg-gray-100`}>
                <Attendee queryRef={attendee} index={++i} />
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
