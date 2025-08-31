import type { CountriesDataType } from '~types/types';

import { useMemo, useDeferredValue } from 'react';

import { useSortKey, useSortOrder, useSelectedYear, useSearch } from '~/store/app-store';

type TableData = {
  data: CountriesDataType;
};

export const useTableData = ({ data }: TableData) => {
  const sortKey = useSortKey();
  const sortOrder = useSortOrder();
  const selectedYear = useSelectedYear();
  const search = useSearch();
  const deferredSearch = useDeferredValue(search);

  return useMemo(() => {
    let entries = Object.entries(data);

    if (deferredSearch.trim()) {
      entries = entries.filter(([countryName]) => countryName.toLowerCase().includes(search.toLowerCase()));
    }

    entries.sort(([nameA, countryA], [nameB, countryB]) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      }

      if (sortKey === 'population') {
        const popA = countryA.data.find((d) => d.year === selectedYear)?.population ?? 0;
        const popB = countryB.data.find((d) => d.year === selectedYear)?.population ?? 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }

      return 0;
    });

    return Object.fromEntries(entries);
  }, [data, deferredSearch, search, selectedYear, sortKey, sortOrder]);
};