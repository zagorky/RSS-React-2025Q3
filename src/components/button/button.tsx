import type { ButtonHTMLAttributes } from 'react';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  dataTestId?: string;
  classNames?: string;
  variant?: 'default' | 'secondary' | 'outline';
};

const variants = {
  default: 'btn',
  outline: 'btn-outline',
  secondary: 'btn-secondary',
};

export const Button = ({
  classNames = '',
  disabled,
  children,
  variant = 'default',
  dataTestId = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      {...withDataTestId(dataTestId)}
      className={cn(
        variants[variant],
        classNames,
        disabled && 'cursor-not-allowed opacity-50'
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
