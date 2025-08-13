'use client';
import type { FormEvent } from 'react';

import { assertIsNonNullable, withDataTestId } from '~lib/utilities';
import { isString } from '~types/type-guards';
import { Button } from '~ui/button/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchFormProps = {
  searchQuery: string;
};

export const SearchForm = ({ searchQuery }: SearchFormProps) => {
  const searchParams = useSearchParams();
  assertIsNonNullable(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    const inputFormData = new FormData(event.currentTarget);
    const formValue = inputFormData.get('search-input');
    if (isString(formValue)) {
      params.set('page', '1');
      params.set('query', formValue);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <form
      {...withDataTestId('search-form')}
      className="search-form"
      onSubmit={handleSubmit}
    >
      <label>
        <span className="sr-only">Search</span>
        <input
          {...withDataTestId('search-form-input')}
          name="search-input"
          defaultValue={searchQuery}
          className="inpt"
          type="text"
          placeholder={searchQuery ?? 'Search'}
        />
      </label>
      <Button classNames="cursor-pointer" type="submit">
        Search
      </Button>
    </form>
  );
};
