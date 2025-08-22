import { createContext, useContext } from 'react';

export type ModalType = string | null;

export const ModalContext = createContext<{
  current: ModalType;
  open: (type: ModalType) => void;
  close: VoidFunction;
} | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`Must provide a ModalProvider`);
  }

  return context;
};