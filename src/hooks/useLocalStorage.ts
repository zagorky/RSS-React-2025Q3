import { useCallback, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const getDataFromLS = useCallback(() => {
    return localStorage.getItem(key) ?? '';
  }, [key]);

  const [query, setQuery] = useState(() => getDataFromLS());

  const setDataQueryToLS = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
      setQuery(value);
    },
    [key]
  );

  return {
    searchQuery: query,
    setSearchQuery: setDataQueryToLS,
  };
};