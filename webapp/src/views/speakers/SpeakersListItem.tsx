import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useFragment, useMutation } from 'react-relay';

import { tw } from 'twind';

import graphql from 'babel-plugin-relay/macro';

import type { SpeakersListItem_speaker$key } from './__generated__/SpeakersListItem_speaker.graphql';
import type { SpeakersListItem_modifySpeakerMutation } from './__generated__/SpeakersListItem_modifySpeakerMutation.graphql';

interface ISpeakesListItem {
  speaker: SpeakersListItem_speaker$key;
}

export const SpeakersListItem: FC<ISpeakesListItem> = ({ speaker }) => {

  const [bioState, setBioState] = useState('');

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

  const { id, name, bio } = data;

  useEffect(() => {
    if (bio) {
      setBioState(bio);
    }
  }, [bio]);

  const [changeBio] = useMutation<SpeakersListItem_modifySpeakerMutation>(
    graphql`
      mutation SpeakersListItem_modifySpeakerMutation($input: ModifySpeakerInput!) {
        modifySpeaker(input: $input) {
          speaker {
            id
            name
            bio
          }
        }
      }
    `,
  );

  const onChangeBio = (e: ChangeEvent<HTMLInputElement>) => {
    setBioState(e.target.value);
  };

  const onBlur = () => {
    if (bioState !== null && bioState !== bio) {
      changeBio({
        variables: {
          input: {
            id: id,
            bio: bioState,
          },
        },
      });
    }
  };

  return (
    <div className={tw`grid grid-cols-2 gap-4`}>
      <div>
        {name}
      </div>
      <input
        type="text"
        name="bio"
        value={bioState}
        className={tw`border-1 border-gray-200 rounded focus:outline-none focus:border-blue-700 focus:border-2`}
        onChange={onChangeBio}
        onBlur={onBlur}
      />
    </div>
  );
};
