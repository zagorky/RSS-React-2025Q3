import type { ReactNode } from 'react';

type RowProps = {
  children: ReactNode;
};

export const Row = ({ children }: RowProps) => {
  return <tr className="hover:bg-gray-50">{children}</tr>;
};