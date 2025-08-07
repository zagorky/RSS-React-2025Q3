import { SEARCH_QUERY_LS_KEY } from '~config/app-config';
import { navigation } from '~config/navigation';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

export type SearchQueryStateType = {
  query: string;
  page: string;
  actions: {
    setSearchQuery: (query: string) => void;
    getNewUrl: () => string;
    setPage: (page: string) => void;
    syncWithUrl: (url: string) => void;
  };
};

export const useQueryStore = create<SearchQueryStateType>()(
  persist(
    (set, get) => ({
      query: '',
      page: '1',
      actions: {
        setSearchQuery: (query) => {
          set(() => ({ query: query.trim(), page: '1' }));
        },
        getNewUrl: () => {
          const searchParameters = new URLSearchParams();
          const { query } = get();

          if (query.trim()) {
            searchParameters.set('q', query);
            searchParameters.set('page', '1');
          }
          return `${navigation.main}?${searchParameters.toString()}`;
        },
        setPage: (page) => set(() => ({ page: page })),
        syncWithUrl: (newUrl: string) => {
          const url = new URL(newUrl);
          const queryFromUrl = url.searchParams.get('q') ?? '';
          const pageFromUrl = url.searchParams.get('page') ?? '1';

          const { query: queryFromStore } = get();

          set({
            query: queryFromStore || queryFromUrl,
            page: pageFromUrl,
          });
        },
      },
    }),
    {
      name: SEARCH_QUERY_LS_KEY,
      partialize: (state) => ({ query: state.query }),
    }
  )
);

export const useSearchQuery = () => useQueryStore((state) => state.query);
export const useQueryStoreActions = () =>
  useQueryStore((state) => state.actions);
