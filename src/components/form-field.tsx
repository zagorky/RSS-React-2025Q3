import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

import { cn } from '~utils/cn';

type BaseProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type: 'text' | 'password' | 'number' | 'email' | 'file';
  };

type CheckboxProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type: 'checkbox';
  };

type RadioProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type: 'radio';
    options: string[];
  };

type SelectProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    type: 'select';
    options: string[];
  };

type FormFieldProps = InputProps | CheckboxProps | RadioProps | SelectProps;

export const FormField = (props: FormFieldProps) => {
  const { label, error, containerClassName, type } = props;

  const renderField = () => {
    switch (type) {
      case 'select': {
        return (
          <label className="w-full">
            {label}
            <select className={cn('inpt w-full')} {...props}>
              {props.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        );
      }

      case 'radio': {
        return (
          <div className="flex w-full flex-col">
            {props.options.map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={props.name}
                  value={opt}
                  defaultChecked={props.value === opt}
                  className="m-2"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      }

      case 'checkbox': {
        return (
          <label className="flex items-center space-x-2">
            <input {...props} className="m-2" />
            {label}
          </label>
        );
      }

      default: {
        return (
          <label className="w-full">
            {label}
            <input className={cn('inpt w-full')} {...props} />
          </label>
        );
      }
    }
  };

  return (
    <div className={cn('flex min-h-[80px] w-full flex-wrap items-center', containerClassName)}>
      {renderField()}
      {error && <div className="text-error h-10 w-full text-center text-xs">{error}</div>}
      {!error && <div className="h-10 w-full"></div>}
    </div>
  );
};