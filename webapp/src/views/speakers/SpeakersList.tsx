import type { FC } from 'react';
import { usePaginationFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import type { SpeakersList_queryFragment } from './__generated__/SpeakersList_queryFragment.graphql';
import type { SpeakersList_query$key } from './__generated__/SpeakersList_query.graphql';
import { SpeakersListItem } from './SpeakersListItem';
import { tw } from 'twind';

interface ISpeakersList {
  queryRef: SpeakersList_query$key;
}

export const SpeakersList: FC<ISpeakersList> =  ({ queryRef }) => {

  const { data, loadNext, hasNext } = usePaginationFragment<SpeakersList_queryFragment, SpeakersList_query$key>(
    graphql`
      fragment SpeakersList_query on Query
        @argumentDefinitions(
          first: { type: "Int!" }
          after: { type: "String" }
        )
        @refetchable(queryName: "SpeakersList_queryFragment") {
        speakers(
          first: $first,
          after: $after
        ) @connection(key: "SpeakersList_speakers") {
          edges {
            node {
              ...SpeakersListItem_speaker @defer
            }
          }
        }
      }
    `,
    queryRef,
  );

  const speakers = data.speakers?.edges?.map(edge => edge?.node) ?? [];

  return (
    <>
      <ul>
        { speakers.length
          ? speakers.map((speaker, i) => {
            return (
              <li key={i}>
                <SpeakersListItem speaker={speaker} />
              </li>
            );
          })
          : <div>No data</div>
        }
      </ul>
      {
        hasNext && (
          <button
            className={tw`py-1 px-2 text-xs bg-blue-500 text-white rounded-full`}
            onClick={() => loadNext(10)}
          >
                More
          </button>
        )
      }
    </>
  );
};
