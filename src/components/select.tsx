import type { ChangeEvent } from 'react';

import { cn } from '~utils/cn';

type SelectProps = {
  className?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: (string | number)[];
};

export const Select = ({ className, value, onChange, options }: SelectProps) => (
  <select className={cn('border-secondary-500 border capitalize', className)} value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);