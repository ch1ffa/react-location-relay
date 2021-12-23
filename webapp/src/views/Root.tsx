import { Spinner } from '@/components';
import { FC, Suspense } from 'react';
import { Link, Outlet } from 'react-location';
import { tw } from 'twind';

export const Root: FC = () => {
  return (
    <div className={tw`min-h-screen flex flex-col`}>
      <div className={tw`flex items-center gap-2`}>
        <h1 className={tw`text-3xl p-2`}>React Location + Relay Example</h1>
      </div>
      <div className={tw`flex-1 flex`}>
        <div className={tw`w-56`}>
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
                  className={tw`block py-2 px-3 text-blue-700`}
                  getActiveProps={() => ({ className: tw`font-bold` })}
                >
                  {label}
                </Link>
              </div>
            );
          })}
        </div>
        <div className={tw`flex-1`}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
