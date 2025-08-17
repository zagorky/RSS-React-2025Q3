import type { ButtonHTMLAttributes } from 'react';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';

const variants = {
  default: 'btn',
  outline: 'btn-outline',
  secondary: 'btn-secondary',
  custom: '',
} as const;

export type ButtonVariants = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  dataTestId?: string;
  classNames?: string;
  variant?: ButtonVariants;
};

export const Button = ({
  classNames = '',
  disabled,
  children,
  variant = 'default',
  dataTestId = '',
  type,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      {...withDataTestId(dataTestId)}
      className={cn(variants[variant], classNames, disabled && 'cursor-not-allowed opacity-50')}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
