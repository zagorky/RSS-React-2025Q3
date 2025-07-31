import type { ButtonHTMLAttributes } from 'react';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  dataTestId?: string;
  classNames?: string;
};

export const Button = ({
  classNames = '',
  onClick,
  type,
  disabled,
  children,
  dataTestId = '',
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(
    'btn',
    classNames,
    disabled && 'opacity-50 cursor-not-allowed'
  );

  return (
    <button
      {...props}
      {...withDataTestId(dataTestId)}
      onClick={onClick}
      className={buttonClasses}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
