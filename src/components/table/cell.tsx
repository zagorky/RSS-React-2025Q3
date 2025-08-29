import type { ReactNode } from 'react';

import { cn } from '~utils/cn';
import { memo } from 'react';

type CellProps = {
  children: ReactNode;
  className?: string;
};

export const Cell = memo(({ children, className }: CellProps) => (
  <td className={cn('border-2 border-gray-50 px-4 py-2 text-sm', className)}>{children}</td>
));

Cell.displayName = 'Cell';