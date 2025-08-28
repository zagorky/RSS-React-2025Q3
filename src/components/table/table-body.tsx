import {Prodlyvator} from '~components/prodlyvator';
import {Cell} from '~components/table/cell';
import {Row} from '~components/table/row';
import {type CountriesDataType, type ExtraColumnType} from '~types/types';
import {cn} from '~utils/cn';
import {formatNumber} from '~utils/utilities';
import {memo} from 'react';

type TableBodyProps = {
  additionalColumns: ExtraColumnType[];
  data: CountriesDataType;
  selectedYear: number;
};

export const TableBody = memo(({ additionalColumns, data, selectedYear }: TableBodyProps) => (
  <tbody className="bg-gray-200">
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
          <Cell>
            <Prodlyvator value={formatNumber(yearData.population)}>
              {(value, isProdlyvator) => <span className={cn({ 'text-primary-600': isProdlyvator })}>{value}</span>}
            </Prodlyvator>
          </Cell>
          <Cell>
            <Prodlyvator value={formatNumber(yearData.co2)}>
              {(value, isProdlyvator) => <span className={cn({ 'text-primary-600': isProdlyvator })}>{value}</span>}
            </Prodlyvator>
          </Cell>
          <Cell>
            <Prodlyvator value={formatNumber(yearData.co2_per_capita)}>
              {(value, isProdlyvator) => <span className={cn({ 'text-primary-600': isProdlyvator })}>{value}</span>}
            </Prodlyvator>
          </Cell>
          {additionalColumns.map((column) => (
            <Cell key={column}>
              <Prodlyvator value={formatNumber(yearData[column]) || 'N/A'}>
                {(value, isProdlyvator) => <span className={cn({ 'text-primary-600': isProdlyvator })}>{value}</span>}
              </Prodlyvator>
            </Cell>
          ))}
        </Row>
      );
    })}
  </tbody>
));

TableBody.displayName = 'TableBody';