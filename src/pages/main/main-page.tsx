import { LS_KEY } from '~config/app-config';
import { navigation } from '~config/navigation';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { useNavigate } from 'react-router';

import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

const MainPage = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useLocalStorage(LS_KEY);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const searchParameters = new URLSearchParams();

    if (query) {
      searchParameters.set('q', query);
      searchParameters.set('page', '1');
    }
    navigate(`${navigation.main}?${searchParameters.toString()}`);
  };

  return (
    <>
      <SearchForm searchQuery={searchQuery} onSubmit={handleSearch} />
      <ResultsSection />
    </>
  );
};

export default MainPage;