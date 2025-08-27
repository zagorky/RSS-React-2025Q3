import type { InputHTMLAttributes } from 'react';

import { cn } from '~utils/cn';

const variants = {
  default: {
    label: 'w-full',
    input: 'inpt w-full',
  },
  inline: {
    label: 'm-auto justify-between flex flex-wrap text-center items-center gap-2',
    input: 'inpt',
  },
} as const;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  variant?: keyof typeof variants;
};

export const Input = ({ variant = 'default', label, className, ...props }: InputProps) => (
  <label className={cn(variants[variant].label, className)}>
    {label}
    <input className={cn(variants[variant].input)} {...props} />
  </label>
);