import type { mainPageLoader2 } from '~api/loaders';

import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchAnimeQuery } from '~api/loaders';
import { useLoaderData } from 'react-router';

export const useMainPageQuery = () => {
  const { query, page } =
    useLoaderData<Awaited<ReturnType<ReturnType<typeof mainPageLoader2>>>>();

  const {
    data: { data: results, pagination },
  } = useSuspenseQuery(fetchAnimeQuery(query, Number(page)));

  return {
    results,
    pagination,
  };
};