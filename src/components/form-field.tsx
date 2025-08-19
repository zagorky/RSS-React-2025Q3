import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '~utils/cn';

type BaseProps = {
  label?: string;
  error?: string;
  customclass?: string;
  register?: UseFormRegisterReturn;
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
  const { label, error, customclass, type } = props;

  const renderField = () => {
    switch (type) {
      case 'select': {
        const { register, ...rest } = props;

        return (
          <label className="w-full">
            {label}
            <select {...register} {...rest} className={cn('inpt w-full')}>
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
        const { register, ...rest } = props;

        return (
          <div className="flex w-full flex-col">
            {props.options.map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  {...rest}
                  {...register}
                  type="radio"
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
        const { register, ...rest } = props;

        return (
          <label className="flex items-center space-x-2">
            <input {...rest} {...register} className="m-2" />
            {label}
          </label>
        );
      }

      default: {
        const { register, ...rest } = props;

        return (
          <label className="w-full">
            {label}
            <input {...rest} {...register} className={cn('inpt w-full')} />
          </label>
        );
      }
    }
  };

  return (
    <div className={cn('flex min-h-[80px] w-full flex-wrap items-center', customclass)}>
      {renderField()}
      {error && <div className="text-error h-10 w-full text-center text-xs">{error}</div>}
      {!error && <div className="h-10 w-full"></div>}
    </div>
  );
};