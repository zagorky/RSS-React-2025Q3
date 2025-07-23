import type { LoaderFunctionArgs } from 'react-router';

import { fetchById, fetchRequest } from '~api/api';
import { navigation } from '~config/navigation';
import { assertIsNonNullable, normalizeError } from '~utils/utilities';
import { redirect } from 'react-router';

export const searchLoader = async ({ request }: LoaderFunctionArgs) => {
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
      pagination: { current_page: '1', has_next_page: false },
      error: normalizeError(error),
    };
  }
};

export const searchAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const searchQuery = formData.get('search-input')?.toString() ?? '';
  const url = new URL(request.url);
  url.searchParams.set('q', searchQuery);
  url.searchParams.set('page', '1');

  return redirect(`${navigation.main}?${url.searchParams.toString()}`);
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
