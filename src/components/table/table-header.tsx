import { Row } from '~components/table/row';
import { mainColumns } from '~types/types';
import { humanize } from '~utils/utilities';
import { useMemo } from 'react';

import { useAdditionalColumns } from '~/store/app-store';

export const TableHeader = () => {
  const additionalColumns = useAdditionalColumns();
  const columns = useMemo(() => {
    return [...mainColumns, ...additionalColumns];
  }, [additionalColumns]);

  return (
    <thead className="bg-gray-50">
      <Row>
        {columns.map((column) => (
          <th key={column} className="border-2 border-gray-200 px-4 py-3 text-center text-sm font-medium capitalize">
            {humanize(column)}
          </th>
        ))}
      </Row>
    </thead>
  );
};