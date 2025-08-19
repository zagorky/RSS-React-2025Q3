import type { InputHTMLAttributes } from 'react';

import { cn } from '~utils/cn';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
  options?: string[];
};

export const FormField = ({ error, label, containerClassName, options, ...props }: FormFieldProps) => {
  const { value, type, name } = props;

  return (
    <div className={cn('flex min-h-[80px] w-full flex-wrap items-center', containerClassName)}>
      {options ? (
        options.map((opt) => (
          <label className="w-full" key={opt}>
            <input className="m-2" type="radio" name={name} value={opt} defaultChecked={value === opt} />
            {opt}
          </label>
        ))
      ) : (
        <label className="w-full">
          {label}
          <input className={cn('inpt', 'w-full')} {...props} name={name} value={value} type={type} />
        </label>
      )}

      {error && <div className="text-error h-10 w-full text-center text-xs">{error}</div>}
      {!error && <div className="h-10 w-full"></div>}
    </div>
  );
};