import { FC, useState } from 'react';
import { usePaginationFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import type { SpeakersList_queryFragment } from './__generated__/SpeakersList_queryFragment.graphql';
import type { SpeakersList_query$key } from './__generated__/SpeakersList_query.graphql';
import { SpeakersListItem } from './SpeakersListItem';
import { tw } from 'twind';
import { UserAddIcon } from '@heroicons/react/outline';
import { SpeakerAdd } from './SpeakerAdd';

interface ISpeakersList {
  queryRef: SpeakersList_query$key;
}

export const SpeakersList: FC<ISpeakersList> =  ({ queryRef }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          __id
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
  const id = data?.speakers?.__id;

  return (
    <>
      <div className={tw`flex`}>
        <div className={tw`text-2xl p-2`}>Speakers</div>
        <button className={tw`w-5 focus:outline-none`} onClick={() => setIsOpen(true)}>
          <UserAddIcon className={tw`text-gray-300 hover:text-blue-500 active:text-blue-400`} />
        </button>
      </div>
      <SpeakerAdd id={id} isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <ul>
        { speakers.length
          ? speakers.map((speaker, i) => {
            return (
              <li key={i} className={tw`p-2 hover:bg-gray-100`}>
                <SpeakersListItem speaker={speaker} index={++i} />
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
