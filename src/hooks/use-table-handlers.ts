import type { ExtraColumnType, SortKeyType, SortOrderType } from '~types/types';
import type { ChangeEvent } from 'react';

import { useCallback } from 'react';

import { useTableStoreActions } from '~/store/app-store';

export const useTableHandlers = () => {
  const actions = useTableStoreActions();

  const handleYearChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      actions.setSelectedYear(Number(event.target.value));
    },
    [actions]
  );

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      actions.setSearch(event.target.value);
    },
    [actions]
  );

  const handleSortKeyChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      actions.setSortKey(event.target.value as SortKeyType);
    },
    [actions]
  );

  const handleSortOrderChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      actions.setSortOrder(event.target.value as SortOrderType);
    },
    [actions]
  );

  const handleColumnToggle = useCallback(
    (column: ExtraColumnType) => {
      actions.toggleColumn(column);
    },
    [actions]
  );

  return {
    handleYearChange,
    handleSearchChange,
    handleSortKeyChange,
    handleSortOrderChange,
    handleColumnToggle,
  };
};