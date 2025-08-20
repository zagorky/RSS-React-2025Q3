import type {UseFormRegisterReturn} from 'react-hook-form';

import {Input} from '~components/form-field/input';
import {type InputHTMLAttributes, useDeferredValue, useState} from 'react';

import {useCountryStore} from '~/store/use-country-store';

type AutocompleteProps = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  label?: string;
  className?: string;
};

export const Autocomplete = ({ register, ...props }: AutocompleteProps) => {
  const countries = useCountryStore((state) => state.countries);
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = countries.filter((c) => c.toLowerCase().includes(deferredValue.toLowerCase()));

  const handleSelect = (country: string) => {
    setValue(country);
    setIsOpen((state) => !state);
  };

  return (
    <div className="relative w-full">
      <Input
        {...props}
        {...register}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen && filteredCountries.length > 0 && (
        <div className="bg-bg absolute z-10 mt-1 max-h-60 overflow-y-auto rounded-md border-3 border-gray-400 shadow-md">
          {filteredCountries.map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => handleSelect(country)}
              className="focus:bg-primary-500/50 hover:bg-primary-500/50 w-full cursor-pointer px-3 py-2 text-left"
            >
              {country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};