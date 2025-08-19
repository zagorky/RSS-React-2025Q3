import type { ReactNode } from 'react';

import { cn } from '~utils/cn';

type FormFieldProps = {
  errorMessage?: string;
  children: ReactNode;
  className?: string;
};

export const FormField = ({ errorMessage, children, className }: FormFieldProps) => {
  return (
    <div className={cn('flex min-h-[80px] w-full flex-wrap items-center', className)}>
      {children}
      {errorMessage && <div className="text-error h-10 w-full text-center text-xs">{errorMessage}</div>}
      {!errorMessage && <div className="h-10 w-full"></div>}
    </div>
  );
};