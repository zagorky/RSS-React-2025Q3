import type {InputHTMLAttributes} from 'react';
import type {UseFormRegisterReturn} from 'react-hook-form';

import {cn} from '~utils/cn';

type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  options: string[];
  register?: UseFormRegisterReturn;
  className?: string;
  label?: string;
};

export const RadioButton = ({ options, register, className, label, ...props }: RadioButtonProps) => {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      {label}
      {options.map((option) => (
        <label key={option} className={cn('flex items-center space-x-2')}>
          <input
            {...props}
            {...register}
            type="radio"
            value={option}
            defaultChecked={props.value === option}
            className="m-2"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};