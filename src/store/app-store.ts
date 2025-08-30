import type { ExtraColumnType, SortKeyType, SortOrderType } from '~types/types';

import { SortOrder, SortKey } from '~types/types';
import { create } from 'zustand';

type TableStoreType = {
  selectedYear: number;
  additionalColumns: ExtraColumnType[];
  search: string;
  sortKey: SortKeyType;
  sortOrder: SortOrderType;
  actions: {
    setSelectedYear: (year: number) => void;
    setAdditionalColumns: (columns: ExtraColumnType[]) => void;
    setSearch: (search: string) => void;
    setSortKey: (sortKey: SortKeyType) => void;
    setSortOrder: (sortOrder: SortOrderType) => void;
    toggleColumn: (col: ExtraColumnType) => void;
  };
};

const useTableStore = create<TableStoreType>()((set) => ({
  selectedYear: 0,
  additionalColumns: [],
  search: '',
  sortKey: SortKey[0],
  sortOrder: SortOrder[0],
  actions: {
    setSelectedYear: (newSelectedYear: number) =>
      set(() => ({
        selectedYear: newSelectedYear,
      })),
    setAdditionalColumns: (extraColumns: ExtraColumnType[]) => set({ additionalColumns: extraColumns }),

    setSearch: (search: string) => set({ search }),

    setSortKey: (sortKey: SortKeyType) => set({ sortKey }),

    setSortOrder: (sortOrder: SortOrderType) => set({ sortOrder }),

    toggleColumn: (col: ExtraColumnType) =>
      set((state) => ({
        additionalColumns: state.additionalColumns.includes(col)
          ? state.additionalColumns.filter((c) => c !== col)
          : [...state.additionalColumns, col],
      })),
  },
}));

export const useSelectedYear = () => useTableStore((state) => state.selectedYear);
export const useAdditionalColumns = () => useTableStore((state) => state.additionalColumns);
export const useSearch = () => useTableStore((state) => state.search);
export const useSortKey = () => useTableStore((state) => state.sortKey);
export const useSortOrder = () => useTableStore((state) => state.sortOrder);
export const useTableStoreActions = () => useTableStore((state) => state.actions);