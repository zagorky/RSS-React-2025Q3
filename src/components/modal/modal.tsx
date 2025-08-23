import type { ModalType } from '~components/modal/hooks/use-modal';

import { Button } from '~components/button';
import { ModalContext, useModal } from '~components/modal/hooks/use-modal';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = { type: string; children: ReactNode };

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState<ModalType>(null);

  const open = (type: ModalType) => setCurrent(type);
  const close = () => setCurrent(null);

  return <ModalContext.Provider value={{ current, open, close }}>{children}</ModalContext.Provider>;
};

const ModalTrigger = ({ type, children }: ModalProps) => {
  const { open } = useModal();

  return <Button onClick={() => open(type)}>{children}</Button>;
};

const ModalContent = ({ type, children }: ModalProps) => {
  const { current, close } = useModal();

  const dialogReference = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogReference.current;

    if (current === type && dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog) {
        dialog.close();
      }
    };
  }, [current, type]);

  if (current !== type) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogReference}
      onCancel={close}
      onClick={(event) => {
        if (event.target === dialogReference.current) {
          close();
        }
      }}
      className="m-auto flex max-w-2xl flex-col justify-center gap-4 rounded-lg p-4 backdrop:bg-gray-900/60"
    >
      {children}
    </dialog>,
    document.body
  );
};

const ModalClose = ({ children }: { children: ReactNode }) => {
  const { close } = useModal();

  return (
    <Button onClick={close} customClassName="w-full">
      {children}
    </Button>
  );
};

export const Modal = ({
  children,
  openButton,
  closeButton,
  type,
}: {
  children: ReactNode;
  openButton: ReactNode;
  closeButton: ReactNode;
  type: string;
}) => (
  <>
    <ModalTrigger type={type}>{openButton}</ModalTrigger>
    <ModalContent type={type}>
      {children}
      <ModalClose>{closeButton}</ModalClose>
    </ModalContent>
  </>
);