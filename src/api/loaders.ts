import type { LoaderDataType } from '~types/loader-types';
import type { LoaderFunctionArgs } from 'react-router';

import { fetchAnimeData, fetchAnimeDataItem } from '~api/api';
import { queryClient } from '~api/query-client';
import { assertIsNonNullable, retrieveQueryFormLS } from '~utils/utilities';
import { redirect } from 'react-router';

export const mainPageLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderDataType | Response> => {
  const url = new URL(request.url);
  const queryFromUrl = url.searchParams.get('q') ?? '';
  const queryFromLS = retrieveQueryFormLS();
  const query = queryFromLS || queryFromUrl;

  if (query !== queryFromUrl && query !== '') {
    const searchParameters = new URLSearchParams();
    searchParameters.set('q', query);
    searchParameters.set('page', '1');
    return redirect(`${url.pathname}?${searchParameters.toString()}`);
  }

  const page = Number(url.searchParams.get('page') ?? '1');

  return queryClient.ensureQueryData({
    queryKey: ['main-page', query, page],
    queryFn: async () => {
      const data = await fetchAnimeData({
        query,
        signal: request.signal,
        page,
      });
      return {
        results: data.data ?? [],
        query,
        pagination: data.pagination,
      };
    },
  });
};

export const detailedPageLoader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const id = params.id;
  assertIsNonNullable(id, 'ID is missing');

  return queryClient.ensureQueryData({
    queryKey: ['detailed-page', id],
    queryFn: async () =>
      await fetchAnimeDataItem({
        id: String(id),
        signal: request.signal,
      }),
  });
};
