import { Row } from '~components/table/row';
import { mainColumns } from '~types/types';
import { humanize } from '~utils/utilities';

type HeaderProps = {
  additionalColumns: string[];
};

export const TableHeader = ({ additionalColumns }: HeaderProps) => (
  <thead className="bg-gray-50">
    <Row>
      {[...mainColumns, ...additionalColumns].map((column) => (
        <th key={column} className="border-2 border-gray-200 px-4 py-3 text-center text-sm font-medium capitalize">
          {humanize(column)}
        </th>
      ))}
    </Row>
  </thead>
);