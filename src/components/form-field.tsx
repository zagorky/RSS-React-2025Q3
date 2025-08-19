import type { InputHTMLAttributes } from 'react';

import { cn } from '~utils/cn';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  labelClassName?: string;
};

export const FormField = ({ error, label, labelClassName, ...props }: FormFieldProps) => {
  const { value, type, name } = props;

  return (
    <div className={cn('w-full', labelClassName)}>
      <label>
        {label}
        <input className={cn('inpt', 'w-full')} {...props} name={name} value={value} type={type} />
      </label>
      {error && <p className="mt-1 h-5 text-sm text-red-500">{error}</p>}
      {!error && <div className="h-5"></div>}
    </div>
  );
};