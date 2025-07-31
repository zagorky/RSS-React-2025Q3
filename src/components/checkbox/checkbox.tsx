import type { InputHTMLAttributes } from 'react';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  dataTestId?: string;
  classNames?: string;
  variant?: 'sm' | 'md' | 'lg';
  label?: string;
};

export const Checkbox = ({
  dataTestId = 'card-checkbox',
  classNames = '',
  variant = 'md',
  label,
  type = 'checkbox',
  name,
  ...props
}: CheckboxProps) => {
  const variants = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <label className="flex items-center gap-4">
      {label && <span>{label}</span>}
      <input
        {...props}
        {...withDataTestId(dataTestId)}
        name={name}
        className={cn(`checkbox`, variants[variant], classNames)}
        type={type}
      ></input>
    </label>
  );
};
