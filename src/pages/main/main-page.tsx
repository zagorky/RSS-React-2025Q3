import { Flyout } from '~components/flyout/flyout';
import { useNavigate } from 'react-router';

import {
  useQueryStoreActions,
  useSearchQuery,
} from '~/store/search-query-store';

import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

const MainPage = () => {
  const navigate = useNavigate();
  const query = useSearchQuery();
  const { setSearchQuery, getNewUrl } = useQueryStoreActions();

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    const newUrl = getNewUrl();
    navigate(newUrl);
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
