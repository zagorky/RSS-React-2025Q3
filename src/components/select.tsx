import type { ChangeEvent } from 'react';

import { cn } from '~utils/cn';

type SelectProps = {
  className?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
};

export const Select = ({ className, value, onChange, options }: SelectProps) => (
  <select className={cn('w-full rounded border px-2 py-1 capitalize', className)} value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);