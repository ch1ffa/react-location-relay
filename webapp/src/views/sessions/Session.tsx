import type { FC } from 'react';
import { useFragment } from 'react-relay';

import { tw } from 'twind';

import graphql from 'babel-plugin-relay/macro';

import type { Session_session$key } from './__generated__/Session_session.graphql';

interface ISession {
  index: number;
  queryRef: Session_session$key;
}

export const Session: FC<ISession> = ({ index, queryRef }) => {
  const session = useFragment(
    graphql`
      fragment Session_session on Session {
        id
        title
        startTime
        endTime
      }
    `,
    queryRef,
  );

  const { title, startTime, endTime } = session;

  return (
    <div className={tw`flex flex-row items-center gap-4`}>
      <div className={tw`w-5`}>
        {index}
      </div>
      <div className={tw`flex flex-row flex-grow items-center gap-4`}>
        <div className={tw`flex-grow`}>
          {title}
        </div>
        <div className={tw`flex-none w-40`}>
          {new Date(startTime).toLocaleString()}
        </div>
        <div className={tw`flex-none w-40`}>
          {new Date(endTime).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
