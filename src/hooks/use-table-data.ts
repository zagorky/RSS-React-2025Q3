import type { CountriesDataType, SortKey, SortOrder } from '~types/types';

import { useMemo } from 'react';

type TableData = {
  data: CountriesDataType;
  search: string;
  sortKey: SortKey;
  sortOrder: SortOrder;
  selectedYear: number;
};

export const useTableData = ({ data, search, sortKey, sortOrder, selectedYear }: TableData) => {
  return useMemo(() => {
    let entries = Object.entries(data);

    if (search.trim()) {
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
  }, [data, search, selectedYear, sortKey, sortOrder]);
};