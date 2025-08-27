import type { ExtraFieldType } from '~types/types';

import { Input } from '~components/input';
import { Modal, ModalProvider } from '~components/modal/modal';
import { TableBody } from '~components/table/table-body';
import { TableHeader } from '~components/table/table-header';
import { YearSelect } from '~components/year-select';
import { allExtraFields } from '~types/types';
import { use, useState } from 'react';

import { stablePromise } from '~/api/api';

export const Table = () => {
  const data = use(stablePromise());
  const allYears = [...new Set(Object.values(data).flatMap((country) => country.data.map((data) => data.year)))].sort(
    (a, b) => b - a
  );
  const [selectedYear, setSelectedYear] = useState(allYears[0]);

  const [extraColumns, setExtraColumns] = useState<ExtraFieldType[]>([]);

  const toggleColumn = (col: ExtraFieldType) => {
    setExtraColumns((previous) => (previous.includes(col) ? previous.filter((c) => c !== col) : [...previous, col]));
  };

  return (
    <ModalProvider>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-center text-2xl font-bold">Climate Data Overview</h1>
        <div className="mb-4 flex items-center justify-between">
          <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} allYears={allYears} />
          <Modal type="cols" openButton="Select Columns" closeButton="Close">
            <h2 className="mb-4 text-lg font-bold">Select Additional Columns</h2>
            <div>
              {allExtraFields.map((field) => (
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
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <TableHeader additionalColumns={extraColumns} />
            <TableBody selectedYear={selectedYear} data={data} additionalColumns={extraColumns} />
          </table>
        </div>
      </div>
    </ModalProvider>
  );
};