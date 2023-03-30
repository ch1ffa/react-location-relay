import { useDisableBodyScroll } from '@/hooks';
import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { tw } from 'twind';

interface IModal extends PropsWithChildren {
  isOpen: boolean;
  onDismiss: () => void;
}

export const Modal: FC<IModal> = ({
  isOpen,
  onDismiss,
  children,
}) => {

  useDisableBodyScroll(isOpen);

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className={tw`absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50`}
            onClick={onDismiss}
          >
            <div
              onClick={e => e.stopPropagation()}
              className={tw`max-w-2xl p-6 bg-white flex items-center justify-between rounded`}
            >
              {children}
            </div>
          </div>,
          document.body,
        )
      }
    </>
  );
};
