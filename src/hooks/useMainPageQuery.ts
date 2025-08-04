import { useQuery } from '@tanstack/react-query';
import { fetchAnimeData } from '~api/api';
import { SEARCH_QUERY_LS_KEY } from '~config/app-config';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { useSearchParams } from 'react-router';

export const useMainPageQuery = () => {
  const { valueFromLS } = useLocalStorage(SEARCH_QUERY_LS_KEY);
  const [searchParameters] = useSearchParams();
  const queryFromUrl = searchParameters.get('q') ?? '';
  const page = Number(searchParameters.get('page') ?? '1');
  const query = valueFromLS || queryFromUrl;

  return useQuery({
    queryKey: ['main-page', query, page],
    queryFn: async ({ signal }) => {
      const data = await fetchAnimeData({ query, signal, page });
      return {
        results: data.data ?? [],
        query,
        pagination: data.pagination,
      };
    },
    throwOnError: true,
  });
};