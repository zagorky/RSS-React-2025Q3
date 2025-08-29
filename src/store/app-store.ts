import type { ExtraColumnType, SortKey, SortOrder } from '~types/types';

import { create } from 'zustand';

type TableStoreType = {
  selectedYear: number;
  additionalColumns: ExtraColumnType[];
  search: string;
  sortKey: SortKey;
  sortOrder: SortOrder;
  // for reviewers: actions в зустанде - это стабильные ссылки и не нуждаются в обертке useCallback
  // подробнее https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
  actions: {
    setSelectedYear: (year: number) => void;
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
  // for reviewers: actions в зустанде - это стабильные ссылки и не нуждаются в обертке useCallback
  // подробнее https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
  actions: {
    setSelectedYear: (newSelectedYear: number) =>
      set(() => ({
        selectedYear: newSelectedYear,
      })),
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
export const useAdditionalColumns = () => useTableStore((state) => state.additionalColumns);
export const useSearch = () => useTableStore((state) => state.search);
export const useSortKey = () => useTableStore((state) => state.sortKey);
export const useSortOrder = () => useTableStore((state) => state.sortOrder);
export const useTableStoreActions = () => useTableStore((state) => state.actions);