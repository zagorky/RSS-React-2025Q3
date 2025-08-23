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
  customClassName?: string;
  variant?: ButtonVariants;
};

export const Button = ({
  customClassName = '',
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
      className={cn(variants[variant], customClassName, { 'cursor-not-allowed opacity-50': disabled })}
      type={type}
    >
      {children}
    </button>
  );
};