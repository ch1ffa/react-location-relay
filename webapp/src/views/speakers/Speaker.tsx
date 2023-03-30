import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useFragment, useMutation, graphql } from 'react-relay';

import { tw } from 'twind';

import type { Speaker_speaker$key } from './__generated__/Speaker_speaker.graphql';
import type { Speaker_modifySpeakerMutation } from './__generated__/Speaker_modifySpeakerMutation.graphql';

interface ISpeaker {
  index: number;
  queryRef: Speaker_speaker$key;
}

export const Speaker: FC<ISpeaker> = ({ index, queryRef }) => {

  const [bioState, setBioState] = useState('');

  const speaker = useFragment(
    graphql`
      fragment Speaker_speaker on Speaker {
        id
        name
        bio
      }
    `,
    queryRef,
  );

  const { id, name, bio } = speaker;

  useEffect(() => {
    if (bio) {
      setBioState(bio);
    }
  }, [bio]);

  const [changeBio] = useMutation<Speaker_modifySpeakerMutation>(
    graphql`
      mutation Speaker_modifySpeakerMutation($input: ModifySpeakerInput!) {
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
    <div className={tw`flex flex-row h-8 items-center gap-4`}>
      <div className={tw`w-5`}>
        {index}
      </div>
      <div className={tw`grid grid-cols-4 items-center`}>
        <div className={tw`col-span-2`}>
          {name}
        </div>
        <input
          type='text'
          name='bio'
          value={bioState}
          className={tw`col-span-2 border-1 border-gray-200 rounded focus:outline-none focus:border-blue-700 focus:border-2`}
          onChange={onChangeBio}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
