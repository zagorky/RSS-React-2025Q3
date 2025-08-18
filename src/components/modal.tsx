import type { ReactNode } from 'react';

import { Button } from '~components/button';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

export const Modal = ({ children, id }: { children: ReactNode; id?: string; openButtonText?: string }) => {
  return createPortal(
    <dialog id={id}>
      <Button popoverTarget={id}>
        <XIcon />
      </Button>
      {children}
    </dialog>,
    document.body
  );
};