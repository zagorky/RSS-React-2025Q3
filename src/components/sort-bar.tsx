import type { SortKey, SortOrder } from '~types/types';

import { useSortKey, useSortOrder, useTableStoreActions } from '~/store/app-store';

export const SortBar = () => {
  const sortKey = useSortKey();
  const sortOrder = useSortOrder();
  const { setSortKey, setSortOrder } = useTableStoreActions();

  return (
    <div className="flex w-full items-center gap-2">
      <label className="whitespace-nowrap">Sort by:</label>

      <select className="w-full" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>

      <select className="w-full" value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
};