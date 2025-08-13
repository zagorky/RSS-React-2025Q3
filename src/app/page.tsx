import { Flyout } from '~ui/flyout/flyout';
import { ResultsSection } from '~ui/results-section/results-section';
import { SearchForm } from '~ui/search-form/search-form';

const MainPage = (
  props: Readonly<{
    searchParams?: { query?: string; page?: string };
  }>
) => {
  const searchParams = props.searchParams;
  const query = searchParams?.query ?? '';
  const page = Number(searchParams?.page ?? 1);
  return (
    <>
      <SearchForm searchQuery={query} />
      <ResultsSection page={page} query={query} />
      <Flyout />
    </>
  );
};

export default MainPage;