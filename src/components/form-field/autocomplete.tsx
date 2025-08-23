import type { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '~components/form-field/input';
import { type InputHTMLAttributes, useDeferredValue, useState } from 'react';

import { useCountries } from '~/store/use-validation-data-store';

type AutocompleteProps = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  label?: string;
  className?: string;
  id: string;
};

export const Autocomplete = ({ id, register, ...props }: AutocompleteProps) => {
  const countries = useCountries();
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);

  const filteredCountries = countries.filter((c) => c.toLowerCase().includes(deferredValue.toLowerCase()));

  return (
    <div className="relative w-full">
      <Input
        {...props}
        {...register}
        list={`${id}-countries`}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />

      <datalist id={`${id}-countries`}>
        {filteredCountries.map((country) => (
          <option value={country} key={country} />
        ))}
      </datalist>
    </div>
  );
};