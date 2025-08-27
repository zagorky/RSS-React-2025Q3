import type { ReactNode } from 'react';

import { cn } from '~utils/cn';

type CellProps = {
  children: ReactNode;
  className?: string;
};

export const Cell = ({ children, className }: CellProps) => {
  return <td className={cn('border border-gray-200 px-4 py-2 text-sm', className)}>{children}</td>;
};