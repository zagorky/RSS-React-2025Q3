import { useCallback, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const getDataFromLS = useCallback(() => {
    return localStorage.getItem(key) ?? '';
  }, [key]);

  const [searchQuery, setSearchQuery] = useState(() => getDataFromLS());

  const setDataQueryToLS = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
      setSearchQuery(value);
    },
    [key]
  );

  return {
    searchQuery,
    setDataQueryToLS,
  };
};
