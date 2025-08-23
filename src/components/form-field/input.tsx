import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '~utils/cn';

const variants = {
  default: {
    label: 'w-full',
    input: 'inpt w-full',
  },
  inline: {
    label: 'm-auto flex flex-wrap  text-center items-center gap-2',
    input: 'inpt m-auto',
  },
} as const;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  label?: string;
  className?: string;
  variant?: keyof typeof variants;
};

export const Input = ({ variant = 'default', register, label, className, ...props }: InputProps) => (
  <label className={cn(variants[variant].label, className)}>
    {label}
    <input className={cn(variants[variant].input)} {...props} {...register} />
  </label>
);