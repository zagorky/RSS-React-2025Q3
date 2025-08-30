import { Select } from '~components/select';
import { useTableHandlers } from '~hooks/use-table-handlers';

import { useSelectedYear } from '~/store/app-store';

type YearSelectProps = {
  allYears: number[];
};

export const YearSelect = ({ allYears }: YearSelectProps) => {
  const selectedYear = useSelectedYear();
  const { handleYearChange } = useTableHandlers();

  return (
    <label className="font-medium">
      Select year:{' '}
      <Select
        className="h-full rounded border px-4 py-2.5"
        value={selectedYear}
        onChange={handleYearChange}
        options={allYears}
      />
    </label>
  );
};