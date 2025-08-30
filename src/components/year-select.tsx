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
      <select className="rounded border px-2 py-1" value={selectedYear} onChange={handleYearChange}>
        {allYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </label>
  );
};