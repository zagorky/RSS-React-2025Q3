import { useCallback, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const getQueryFromLS = useCallback(() => {
    return localStorage.getItem(key) ?? '';
  }, [key]);

  const [searchQuery, setSearchQuery] = useState(() => getQueryFromLS());

  const setSearchQueryToLS = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
      setSearchQuery(value);
    },
    [key]
  );

  return {
    searchQuery,
    setSearchQueryToLS,
  };
};