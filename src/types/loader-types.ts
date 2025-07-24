import type { DataItem, PaginationType } from '~types/types';

export type LoaderDataType = {
  results: DataItem[];
  query: string;
  pagination: Pick<
    PaginationType,
    'current_page' | 'has_next_page' | 'last_visible_page'
  >;
  error: string | null;
};

export type LoaderDetailedPageType =
  | { data: DataItem; error: null }
  | { data: null; error: string };
