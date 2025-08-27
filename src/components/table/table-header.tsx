import { Row } from '~components/table/row';
import { mainColumns } from '~types/types';

type HeaderProps = {
  additionalColumns: string[];
};

export const TableHeader = ({ additionalColumns }: HeaderProps) => (
  <thead className="bg-gray-50">
    <Row>
      {mainColumns.map((column) => (
        <th key={column} className="border border-gray-200 px-4 py-3 text-left text-sm font-medium capitalize">
          {column.replaceAll('_', ' ')}
        </th>
      ))}
      {additionalColumns.map((column) => (
        <th key={column} className="border border-gray-200 px-4 py-3 text-left text-sm font-medium capitalize">
          {column.replaceAll('_', ' ')}
        </th>
      ))}
    </Row>
  </thead>
);