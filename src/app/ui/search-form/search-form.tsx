'use client';
import type { FormEvent } from 'react';

import { usePathname, useRouter } from '~i18n/navigation';
import { withDataTestId } from '~lib/utilities';
import { useQueryStoreActions } from '~store/search-query-store';
import { isString } from '~types/type-guards';
import { Button } from '~ui/button/button';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type SearchFormProps = {
  searchQuery: string;
};

export const SearchForm = ({ searchQuery }: SearchFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setSearchQuery } = useQueryStoreActions();
  const t = useTranslations('SearchForm');

  useEffect(() => {
    setSearchQuery(searchParams.get('query') ?? '');
  }, [searchParams, setSearchQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    const inputFormData = new FormData(event.currentTarget).get('search-input');
    if (isString(inputFormData) && inputFormData.trim()) {
      setSearchQuery(inputFormData);
      params.set('page', '1');
      params.set('query', inputFormData);
    } else {
      setSearchQuery('');
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
