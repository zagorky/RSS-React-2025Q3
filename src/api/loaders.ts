import type { LoaderFunctionArgs } from 'react-router';

import { type QueryClient, queryOptions } from '@tanstack/react-query';
import { fetchAnimeData, fetchAnimeDataItem } from '~api/api';
import { assertIsNonNullable } from '~utils/utilities';

import { useQueryStore } from '~/store/search-query-store';

export const fetchAnimeQuery = (
  query: string,
  page: number,
  signal?: AbortSignal
) =>
  queryOptions({
    queryKey: ['main-page', query, page],
    queryFn: () => fetchAnimeData({ query, page, signal }),
  });

export const fetchAnimeByIdQuery = (
  id: number | string,
  signal?: AbortSignal
) =>
  queryOptions({
    queryKey: ['detailed-page', String(id)],
    queryFn: async () =>
      await fetchAnimeDataItem({
        id: String(id),
        signal,
      }),
  });

export const mainPageLoader2 =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const { actions } = useQueryStore.getState();
    actions.syncWithUrl(request.url);
    const { query, page } = useQueryStore.getState();
    const pageNumber = Number(page);

    const data = await queryClient.ensureQueryData(
      fetchAnimeQuery(query, pageNumber, request.signal)
    );

    return {
      results: data.data,
      query,
      page,
      pagination: data.pagination,
    };
  };

export const detailedPageLoader2 =
  (queryClient: QueryClient) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    const id = params.id;
    assertIsNonNullable(id, 'ID is missing');
    return await queryClient.ensureQueryData(
      fetchAnimeByIdQuery(id, request.signal)
    );
  };