import type { FC } from 'react';
import { useFragment } from 'react-relay';

import graphql from 'babel-plugin-relay/macro';
import type { SpeakersListItem_speaker$key } from './__generated__/SpeakersListItem_speaker.graphql';

interface ISpeakesListItem {
  speaker: SpeakersListItem_speaker$key;
}

export const SpeakersListItem: FC<ISpeakesListItem> = ({ speaker }) => {

  const data = useFragment(
    graphql`
      fragment SpeakersListItem_speaker on Speaker {
        id
        name
        bio
      }
    `,
    speaker,
  );

  const { name } = data;

  return (
    <>
      {name}
    </>
  );
};
