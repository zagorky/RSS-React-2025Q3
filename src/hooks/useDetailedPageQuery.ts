import { useQuery } from '@tanstack/react-query';
import { fetchAnimeDataItem } from '~api/api';

export const useDetailedPageQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['detailed-page', id],
    queryFn: ({ signal }) => fetchAnimeDataItem({ id: String(id), signal }),
    enabled: !!id,
  });
};