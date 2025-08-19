import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '~utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  label?: string;
  className?: string;
};

export const Input = ({ label, register, className, ...props }: InputProps) => {
  return (
    <label className={cn('w-full', className)}>
      {label}
      <input {...props} {...register} className={cn('inpt w-full')} />
    </label>
  );
};