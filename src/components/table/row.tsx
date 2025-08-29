import type { ReactNode } from 'react';

import { memo } from 'react';

type RowProps = {
  children: ReactNode;
};

export const Row = memo(({ children }: RowProps) => <tr className="hover:bg-gray-50">{children}</tr>);

Row.displayName = 'Row';