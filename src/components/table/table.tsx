import { ColumnSelector } from '~components/column-selector';
import { ModalProvider } from '~components/modal/modal';
import { SearchBar } from '~components/search-bar';
import { SortBar } from '~components/sort-bar';
import { TableBody } from '~components/table/table-body';
import { TableHeader } from '~components/table/table-header';
import { YearSelect } from '~components/year-select';
import { useTableData } from '~hooks/use-table-data';
import { getAllYears } from '~utils/utilities';
import { use, useEffect } from 'react';

import { stablePromise } from '~/api/api';
import { useSelectedYear, useTableStoreActions } from '~/store/app-store';

export const Table = () => {
  const data = use(stablePromise());
  const allYears = getAllYears(data);

  const selectedYear = useSelectedYear();
  const { setSelectedYear } = useTableStoreActions();

  useEffect(() => {
    if (selectedYear === 0 && allYears.length > 0) {
      setSelectedYear(allYears[0]);
    }
  }, [selectedYear, allYears, setSelectedYear]);

  const filteredAndSortedData = useTableData({ data });

  return (
    <ModalProvider>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-center text-2xl font-bold">Climate Data Overview</h1>
        <div className="mb-4 grid grid-cols-1 items-center justify-items-center gap-2 md:grid-cols-4">
          <YearSelect allYears={allYears} />
          <SearchBar />
          <SortBar />
          <ColumnSelector />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <TableHeader />
            <TableBody data={filteredAndSortedData} />
          </table>
        </div>
      </div>
    </ModalProvider>
  );
};