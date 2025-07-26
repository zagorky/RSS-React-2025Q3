import type { DataItem, PaginationType } from '~types/types';

export type LoaderDataType = {
  results: DataItem[];
  query: string;
  pagination: PaginationType;
  error: string | null;
};

export type LoaderDetailedPageType =
  | { data: DataItem; error: null }
  | { data: null; error: string };
