import type { InputHTMLAttributes } from 'react';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';

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
  checked,
  ...props
}: CheckboxProps) => {
  return (
    <label className="flex items-center gap-4">
      {label && <span>{label}</span>}
      <input
        {...props}
        checked={checked}
        {...withDataTestId(dataTestId)}
        name={name}
        type="checkbox"
        className={cn(`checkbox`, size[sizeVariant], classNames)}
      ></input>
    </label>
  );
};