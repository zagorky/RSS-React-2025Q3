import { retrieveQueryFormLS, setQueryToLS } from '~utils/utilities';
import { useState } from 'react';

import { ErrorButton } from './components/error-section/error-button';
import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState(retrieveQueryFormLS());

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setQueryToLS(query);
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