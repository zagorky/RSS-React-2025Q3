import { Input } from '~components/input';
import { Modal } from '~components/modal/modal';
import { additionalColumns } from '~types/types';
import { humanize } from '~utils/utilities';

import { useAdditionalColumns, useTableStoreActions } from '~/store/app-store';

export const ColumnSelector = () => {
  const extraColumns = useAdditionalColumns();
  const { toggleColumn } = useTableStoreActions();

  return (
    <div>
      <Modal type="cols" openButton="Select Columns" closeButton="Close">
        <h2 className="mb-4 text-lg font-bold">Select Additional Columns</h2>
        <div>
          {additionalColumns.map((field) => (
            <Input
              variant="inline"
              label={humanize(field)}
              key={field}
              type="checkbox"
              onChange={() => toggleColumn(field)}
              checked={extraColumns.includes(field)}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};