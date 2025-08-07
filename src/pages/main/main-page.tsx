import { Flyout } from '~components/flyout/flyout';
import { SEARCH_QUERY_LS_KEY } from '~config/app-config';
import { navigation } from '~config/navigation';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { useMainPageQuery } from '~hooks/useMainPageQuery';
import { useNavigate } from 'react-router';

import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

const MainPage = () => {
  const navigate = useNavigate();
  const { setValueToLS } = useLocalStorage(SEARCH_QUERY_LS_KEY);
  const { query } = useMainPageQuery();

  const handleSearch = (query: string) => {
    setValueToLS(query);
    const searchParameters = new URLSearchParams();

    if (query) {
      searchParameters.set('q', query);
      searchParameters.set('page', '1');
    }
    navigate(`${navigation.main}?${searchParameters.toString()}`);
  };

  return (
    <>
      <SearchForm searchQuery={query} onSubmit={handleSearch} />
      <ResultsSection />
      <Flyout />
    </>
  );
};

export default MainPage;
