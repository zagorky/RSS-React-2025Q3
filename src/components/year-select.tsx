import { useSelectedYear, useTableStoreActions } from '~/store/app-store';

type YearSelectProps = {
  allYears: number[];
};

export const YearSelect = ({ allYears }: YearSelectProps) => {
  const selectedYear = useSelectedYear();
  const { setSelectedYear } = useTableStoreActions();

  return (
    <label className="font-medium">
      Select year:{' '}
      <select
        className="rounded border px-2 py-1"
        value={selectedYear}
        onChange={(event) => setSelectedYear(Number(event.target.value))}
      >
        {allYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </label>
  );
};