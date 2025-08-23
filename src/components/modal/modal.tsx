import type { ModalType } from '~components/modal/hooks/use-modal';

import { Button } from '~components/button';
import { ModalContext, useModal } from '~components/modal/hooks/use-modal';
import { type ReactNode, useState } from 'react';
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

  if (current !== type) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={close}>
      <div
        className="bg-bg flex max-w-2xl flex-col justify-center gap-4 rounded-lg p-4"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
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