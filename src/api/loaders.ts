import type { LoaderDataType } from '~types/loader-types';
import type { LoaderFunctionArgs } from 'react-router';

import { fetchAnimeData, fetchAnimeDataItem } from '~api/api';
import {
  assertIsNonNullable,
  getErrorMessageFromUnknown,
  retrieveQueryFormLS,
  setQueryToLS,
} from '~utils/utilities';
import { redirect } from 'react-router';

export const mainPageLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderDataType | Response> => {
  const url = new URL(request.url);
  const queryFromUrl = url.searchParams.get('q') ?? '';
  const queryFromLS = retrieveQueryFormLS();
  let query = queryFromLS;

  if (queryFromLS === '' && queryFromUrl !== '') {
    setQueryToLS(queryFromUrl);
    query = queryFromUrl;
  }

  if (query !== queryFromUrl && query !== '') {
    const searchParameters = new URLSearchParams();
    searchParameters.set('q', query);
    searchParameters.set('page', '1');
    return redirect(`${url.pathname}?${searchParameters.toString()}`);
  }

  const page = Number(url.searchParams.get('page') ?? '1');

  try {
    const data = await fetchAnimeData({ query, signal: request.signal, page });
    const pagination = data.pagination;
    const results = data.data ?? [];

    return { results, query, pagination, error: null };
  } catch (error) {
    return {
      results: [],
      query: '',
      pagination: {
        current_page: 1,
        has_next_page: false,
        last_visible_page: 1,
      },
      error: getErrorMessageFromUnknown(error),
    };
  }
};

export const detailedPageLoader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const id = params.id;
  assertIsNonNullable(id, 'ID is missing');

  try {
    const data = await fetchAnimeDataItem({ id, signal: request.signal });

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessageFromUnknown(error),
    };
  }
};