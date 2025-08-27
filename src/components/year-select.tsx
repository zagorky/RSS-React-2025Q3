import type { Dispatch, SetStateAction } from 'react';

type YearSelectProps = {
  allYears: number[];
  selectedYear: number;
  setSelectedYear: Dispatch<SetStateAction<number>>;
};

export const YearSelect = ({ allYears, selectedYear, setSelectedYear }: YearSelectProps) => (
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