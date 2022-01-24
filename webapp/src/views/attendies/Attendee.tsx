import type { FC } from 'react';
import { useFragment } from 'react-relay';

import { tw } from 'twind';

import graphql from 'babel-plugin-relay/macro';

import type { Attendee_attendee$key } from './__generated__/Attendee_attendee.graphql';

interface IAttendee {
  index: number;
  queryRef: Attendee_attendee$key;
}

export const Attendee: FC<IAttendee> = ({ index, queryRef }) => {
  const attendee = useFragment(
    graphql`
      fragment Attendee_attendee on Attendee {
        id
        firstName
        lastName
        country
      }
    `,
    queryRef,
  );

  const { firstName, lastName, country } = attendee;

  return (
    <div className={tw`flex flex-row h-8 items-center gap-4`}>
      <div className={tw`w-5`}>
        {index}
      </div>
      <div className={tw`grid grid-cols-4 items-center`}>
        <div className={tw`col-span-2`}>
          {`${firstName} ${lastName}`}
        </div>
        <div className={tw`col-span-2`}>
          {country}
        </div>
      </div>
    </div>
  );
};
