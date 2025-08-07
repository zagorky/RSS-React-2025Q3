import type { detailedPageLoader2 } from '~api/loaders';

import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchAnimeByIdQuery } from '~api/loaders';
import { useLoaderData } from 'react-router';

export const useDetailedPageQuery = () => {
  const { mal_id: id } =
    useLoaderData<
      Awaited<ReturnType<ReturnType<typeof detailedPageLoader2>>>
    >();

  return useSuspenseQuery(fetchAnimeByIdQuery(id));
};
