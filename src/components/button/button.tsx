import type { ButtonHTMLAttributes } from 'react';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  dataTestId?: string;
  classNames?: string;
  variant?: 'default' | 'secondary' | 'outline';
};

export const Button = ({
  classNames = '',
  onClick,
  type,
  disabled,
  children,
  variant = 'default',
  dataTestId = '',
  ...props
}: ButtonProps) => {
  const variants = {
    default: 'btn',
    outline: 'btn-outline',
    secondary: 'btn-secondary',
  };

  return (
    <button
      {...props}
      {...withDataTestId(dataTestId)}
      onClick={onClick}
      className={cn(
        variants[variant],
        classNames,
        disabled && 'cursor-not-allowed opacity-50'
      )}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
