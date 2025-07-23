import type { DataItem, PaginationType } from '~types/types';

import { LS_KEY } from '~config/app-config';
import { navigation } from '~config/navigation';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

type LoaderDataType = {
  results: DataItem[];
  query: string;
  pagination: PaginationType;
  error: string | null;
};

const MainPage = () => {
  const { results, query, pagination, error } = useLoaderData<LoaderDataType>();
  const { searchQuery, setSearchQueryToLS } = useLocalStorage(LS_KEY);
  const fetcher = useFetcher<LoaderDataType>();

  useEffect(() => {
    if (query !== searchQuery) {
      setSearchQueryToLS(query);
    }
  }, [query, searchQuery, setSearchQueryToLS]);

  const handleSearch = (query: string) => {
    setSearchQueryToLS(query);
    void fetcher.submit(
      { 'search-input': query },
      {
        method: 'post',
        action: navigation.main,
      }
    );
  };

  return (
    <>
      <SearchForm searchQuery={searchQuery} onSubmit={handleSearch} />
      <ResultsSection
        loading={fetcher.state === 'loading'}
        results={fetcher.data?.results ?? results}
        pagination={pagination}
        error={fetcher.data?.error ?? error}
      />
    </>
  );
};

export default MainPage;
