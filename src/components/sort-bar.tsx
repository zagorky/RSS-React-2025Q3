import { Select } from '~components/select';
import { useTableHandlers } from '~hooks/use-table-handlers';
import { SortKey, SortOrder } from '~types/types';

import { useSortKey, useSortOrder } from '~/store/app-store';

export const SortBar = () => {
  const sortKey = useSortKey();
  const sortOrder = useSortOrder();
  const { handleSortOrderChange, handleSortKeyChange } = useTableHandlers();

  return (
    <div className="flex w-full items-center gap-2">
      <label className="whitespace-nowrap">Sort by:</label>
      <Select value={sortKey} onChange={handleSortKeyChange} options={SortKey} />
      <Select value={sortOrder} onChange={handleSortOrderChange} options={SortOrder} />
    </div>
  );
};