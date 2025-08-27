import type { CountriesDataType, ExtraFieldType } from '~types/types';

import { Cell } from '~components/table/cell';
import { Row } from '~components/table/row';
import { formatNumber } from '~utils/utilities';

type TableBodyProps = {
  additionalColumns: ExtraFieldType[];
  data: CountriesDataType;
  selectedYear: number;
};

export const TableBody = ({ additionalColumns, data, selectedYear }: TableBodyProps) => {
  return (
    <tbody className="bg-bg-secondary/70">
      {Object.entries(data).map(([countryName, countryData]) => {
        const yearData = countryData.data.find((data) => data.year === selectedYear);

        if (!yearData) {
          return null;
        }

        return (
          <Row key={countryName}>
            <Cell className="font-medium">{countryName}</Cell>
            <Cell>{countryData.iso_code || 'N/A'}</Cell>
            <Cell>{yearData.year}</Cell>
            <Cell>{formatNumber(yearData.population)}</Cell>
            <Cell>{formatNumber(yearData.co2)}</Cell>
            <Cell> {formatNumber(yearData.co2_per_capita)}</Cell>
            {additionalColumns.map((column) => (
              <Cell key={column}>{formatNumber(yearData[column]) || 'N/A'}</Cell>
            ))}
          </Row>
        );
      })}
    </tbody>
  );
};