'use client';
import type { FormEvent } from 'react';

import { withDataTestId } from '~lib/utilities';
import { isString } from '~types/type-guards';
import { Button } from '~ui/button/button';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchFormProps = {
  searchQuery: string;
};

export const SearchForm = ({ searchQuery }: SearchFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations('SearchForm');

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
        <span className="sr-only">{t('placeholder')}</span>
        <input
          {...withDataTestId('search-form-input')}
          name="search-input"
          defaultValue={searchQuery}
          className="inpt"
          type="text"
          placeholder={searchQuery}
        />
      </label>
      <Button classNames="cursor-pointer" type="submit">
        {t('submit')}
      </Button>
    </form>
  );
};
