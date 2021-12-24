import { FC, Suspense } from 'react';
import { Link, Outlet } from 'react-location';
import { tw } from 'twind';

export const Root: FC = () => {
  return (
    <div className={tw`container mx-auto`}>
      <h1 className={tw`text-3xl pt-2 px-2`}>React Location + Relay Example</h1>
      <div className={tw`inline-flex w-full px-1 pt-2`}>
        {[
          ['speakers', 'Speakers'],
          ['attendies', 'Attendies'],
          ['sessions', 'Sessions'],
          ['tracks', 'Tracks'],
        ].map(([to, label]) => {
          return (
            <div key={to}>
              <Link
                to={to}
                className={tw`block py-2 px-3 text-blue-700 hover:bg-gray-100`}
                getActiveProps={() => ({ className: tw`font-bold` })}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className={tw`flex-1`}>
        <Suspense fallback={'Loading...'}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
