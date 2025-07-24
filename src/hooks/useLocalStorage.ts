import { useCallback, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const getDataFromLS = useCallback(() => {
    return localStorage.getItem(key) ?? '';
  }, [key]);

  const [searchQuery, setSearchQuery] = useState(() => getDataFromLS());

  const setDataQueryToLS = useCallback(
    (value: { query?: string; page?: string }) => {
      const modifiedValue = JSON.stringify(value);
      localStorage.setItem(key, modifiedValue);
      setSearchQuery(modifiedValue);
    },
    [key]
  );

  return {
    searchQuery,
    setDataQueryToLS,
  };
};
