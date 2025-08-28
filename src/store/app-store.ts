import type { ExtraColumnType, SortKey, SortOrder } from '~types/types';

import { create } from 'zustand';

type TableStoreType = {
  selectedYear: number;
  additionalColumns: ExtraColumnType[];
  search: string;
  sortKey: SortKey;
  sortOrder: SortOrder;
  setSelectedYear: (year: number) => void;
  actions: {
    setAdditionalColumns: (columns: ExtraColumnType[]) => void;
    setSearch: (search: string) => void;
    setSortKey: (sortKey: SortKey) => void;
    setSortOrder: (sortOrder: SortOrder) => void;
    toggleColumn: (col: ExtraColumnType) => void;
  };
};

const useTableStore = create<TableStoreType>()((set) => ({
  selectedYear: 0,
  additionalColumns: [],
  search: '',
  sortKey: 'name',
  sortOrder: 'asc',
  setSelectedYear: (newSelectedYear: number) =>
    set(() => ({
      selectedYear: newSelectedYear,
    })),
  actions: {
    setAdditionalColumns: (extraColumns: ExtraColumnType[]) => set({ additionalColumns: extraColumns }),

    setSearch: (search: string) => set({ search }),

    setSortKey: (sortKey: SortKey) => set({ sortKey }),

    setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),

    toggleColumn: (col: ExtraColumnType) =>
      set((state) => ({
        additionalColumns: state.additionalColumns.includes(col)
          ? state.additionalColumns.filter((c) => c !== col)
          : [...state.additionalColumns, col],
      })),
  },
}));

export const useSelectedYear = () => useTableStore((state) => state.selectedYear);
export const useSetSelectedYear = () => useTableStore((state) => state.setSelectedYear);
export const useAdditionalColumns = () => useTableStore((state) => state.additionalColumns);
export const useSearch = () => useTableStore((state) => state.search);
export const useSortKey = () => useTableStore((state) => state.sortKey);
export const useSortOrder = () => useTableStore((state) => state.sortOrder);
export const useTableStoreActions = () => useTableStore((state) => state.actions);