import { ChangeEvent, FC, useState } from 'react';
import { tw } from 'twind';

import { Modal } from '@/components';

import { useMutation, graphql } from 'react-relay';
import type { SpeakerAdd_commitMutation } from './__generated__/SpeakerAdd_commitMutation.graphql';

interface ISpeakerAdd {
  id?: string;
  isOpen: boolean;
  closeModal: () => void;
}

export const SpeakerAdd: FC<ISpeakerAdd> = ({ id, isOpen, closeModal }) => {
  const [name, setName] = useState('');

  const onChangeBio = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [addSpeaker] = useMutation<SpeakerAdd_commitMutation>(
    graphql`
      mutation SpeakerAdd_commitMutation(
        $connections: [ID!]!
        $input: AddSpeakerInput!) {
        addSpeaker(input: $input) {
          speaker @prependNode(connections: $connections, edgeTypeName: "SpeakersEdge") {
            id
            name
            bio
          }
        }
      }
    `,
  );

  const commit = () => {
    if (id) {
      addSpeaker({
        variables: {
          input: {
            name: name,
          },
          connections: [id],
        },
      });
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onDismiss={closeModal}>
      <div className={tw`flex flex-col gap-4`}>
        <div>
          Add Speaker
        </div>
        <input
          type='text'
          name='name'
          value={name}
          placeholder='Enter name'
          className={tw`col-span-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-700 focus:border-2`}
          onChange={onChangeBio}
        />
        <div className={tw`flex justify-end`}>
          <button
            className={tw`py-1 px-2 ml-2 text-xs bg-white hover:bg-gray-100 rounded focus:outline-none`}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className={tw`py-1 px-2 ml-2 text-xs bg-blue-500 hover:bg-blue-400 text-white rounded disabled:bg-blue-200 focus:outline-none`}
            disabled={!name.length}
            onClick={commit}
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};
