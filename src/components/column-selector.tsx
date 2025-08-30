import { Input } from '~components/input';
import { Modal } from '~components/modal/modal';
import { useTableHandlers } from '~hooks/use-table-handlers';
import { additionalColumns } from '~types/types';
import { humanize } from '~utils/utilities';

import { useAdditionalColumns } from '~/store/app-store';

export const ColumnSelector = () => {
  const extraColumns = useAdditionalColumns();
  const { handleColumnToggle } = useTableHandlers();

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
              onChange={() => handleColumnToggle(field)}
              checked={extraColumns.includes(field)}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};