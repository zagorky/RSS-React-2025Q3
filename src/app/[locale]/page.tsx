import {Flyout} from '~ui/flyout/flyout';
import {Loader} from '~ui/loader/loader';
import {ResultsSection} from '~ui/results-section/results-section';
import {SearchForm} from '~ui/search-form/search-form';
import {Suspense} from 'react';

const MainPage = async (
  props: Readonly<{
    searchParams?: Promise<{ query?: string; page?: string }>;
  }>
) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const page = Number(searchParams?.page ?? 1);
  return (
    <>
      <SearchForm searchQuery={query} />
      <Suspense fallback={<Loader />}>
        <ResultsSection page={page} query={query} />
      </Suspense>
      <Flyout />
    </>
  );
};

export default MainPage;