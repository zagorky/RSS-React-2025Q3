import { LS_KEY } from '~config/app-config';
import { useLocalStorage } from '~hooks/useLocalStorage';

import { ErrorButton } from './components/error-section/error-button';
import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

const MainPage = () => {
  const { searchQuery, setSearchQueryToLS } = useLocalStorage(LS_KEY);

  const handleSearch = (query: string) => {
    setSearchQueryToLS(query);
  };
  return (
    <>
      <SearchForm searchQuery={searchQuery} onSubmit={handleSearch} />
      <ResultsSection searchQuery={searchQuery} />
      <ErrorButton />
    </>
  );
};

export default MainPage;