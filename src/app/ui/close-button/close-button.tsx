'use client';
import type { ReactNode } from 'react';

import { useRouter } from '~i18n/navigation';
import { cn } from '~lib/cn';
import { Button } from '~ui/button/button';

export const CloseButton = ({
  variant,
  classNames,
  children,
}: {
  variant?: 'default' | 'secondary' | 'outline' | 'custom';
  classNames?: string;
  children?: ReactNode;
}) => {
  const { back } = useRouter();
  const handleClose = () => {
    back();
  };

  return (
    <Button
      onClick={handleClose}
      variant={variant}
      classNames={cn(classNames, 'cursor-pointer')}
      aria-label="Close detailed page"
    >
      {children}
    </Button>
  );
};
