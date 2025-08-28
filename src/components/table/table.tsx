import { Input } from '~components/input';
import { Modal, ModalProvider } from '~components/modal/modal';
import { TableBody } from '~components/table/table-body';
import { TableHeader } from '~components/table/table-header';
import { YearSelect } from '~components/year-select';
import { additionalColumns, type ExtraColumnType, type SortKey, type SortOrder } from '~types/types';
import { use, useState, useMemo } from 'react';

import { stablePromise } from '~/api/api';

export const Table = () => {
  const data = use(stablePromise());
  const allYears = [...new Set(Object.values(data).flatMap((country) => country.data.map((data) => data.year)))].sort(
    (a, b) => b - a
  );

  const [selectedYear, setSelectedYear] = useState(allYears[0]);
  const [extraColumns, setExtraColumns] = useState<ExtraColumnType[]>([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const toggleColumn = (col: ExtraColumnType) => {
    setExtraColumns((previous) => (previous.includes(col) ? previous.filter((c) => c !== col) : [...previous, col]));
  };

  const filteredAndSortedData = useMemo(() => {
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
  }, [data, search, sortKey, sortOrder, selectedYear]);

  return (
    <ModalProvider>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-center text-2xl font-bold">Climate Data Overview</h1>
        <div className="mb-4 grid grid-cols-1 items-center justify-items-center gap-4 md:grid-cols-4">
          <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} allYears={allYears} />

          <Input
            variant="default"
            placeholder="Search country"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Sort by:</label>
            <select className="w-full" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
              <option value="name">Name</option>
              <option value="population">Population</option>
            </select>

            <select
              className="w-full"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          <div>
            <Modal type="cols" openButton="Select Columns" closeButton="Close">
              <h2 className="mb-4 text-lg font-bold">Select Additional Columns</h2>
              <div>
                {additionalColumns.map((field) => (
                  <Input
                    variant="inline"
                    label={field.replaceAll('_', ' ')}
                    key={field}
                    type="checkbox"
                    onChange={() => toggleColumn(field)}
                    checked={extraColumns.includes(field)}
                  />
                ))}
              </div>
            </Modal>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <TableHeader additionalColumns={extraColumns} />
            <TableBody selectedYear={selectedYear} data={filteredAndSortedData} additionalColumns={extraColumns} />
          </table>
        </div>
      </div>
    </ModalProvider>
  );
};