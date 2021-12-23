import type { FC } from 'react';
import { tw } from 'twind';

export const Spinner: FC = () => {
  return (
    <div>
      <div style={{ borderTopColor: 'transparent' }}
        className={tw`w-16 h-16 border-4 border-blue-700 border-solid rounded-full animate-spin`} />
    </div>
  );
};
