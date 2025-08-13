import type { InputHTMLAttributes } from 'react';

import { cn } from '~lib/cn';
import { withDataTestId } from '~lib/utilities';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  dataTestId?: string;
  classNames?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
  label?: string;
};

const size = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export const Checkbox = ({
  dataTestId = 'card-checkbox',
  classNames,
  sizeVariant = 'md',
  label,
  name,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <label className="flex items-center gap-4">
      {label && <span>{label}</span>}
      <input
        {...props}
        {...withDataTestId(dataTestId)}
        name={name}
        onChange={onChange}
        type="checkbox"
        className={cn(`checkbox`, size[sizeVariant], classNames)}
      ></input>
    </label>
  );
};
