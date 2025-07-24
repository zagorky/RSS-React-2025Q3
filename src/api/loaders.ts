import type { LoaderDataType } from '~types/loader-types';
import type { LoaderFunctionArgs } from 'react-router';

import { fetchById, fetchRequest } from '~api/api';
import { assertIsNonNullable, normalizeError } from '~utils/utilities';

export const mainPageLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderDataType> => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');

  try {
    const data = await fetchRequest(query, request.signal, page);
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
      error: normalizeError(error),
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
    const data = await fetchById(id, request.signal);

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: normalizeError(error),
    };
  }
};