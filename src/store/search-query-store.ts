import {SEARCH_QUERY_LS_KEY} from '~config/app-config';
import {persist} from 'zustand/middleware';
import {create} from 'zustand/react';

export type SearchQueryStateType = {
  query: string;
  page: string;
  actions: {
    setSearchQuery: (query: string) => void;
  };
};

export const useQueryStore = create<SearchQueryStateType>()(
  persist(
    (set) => ({
      query: '',
      page: '1',
      actions: {
        setSearchQuery: (query) => {
          set(() => ({ query: query.trim(), page: '1' }));
        },
      },
    }),
    {
      name: SEARCH_QUERY_LS_KEY,
      partialize: (state) => ({ query: state.query }),
    }
  )
);

export const useQueryStoreActions = () =>
  useQueryStore((state) => state.actions);