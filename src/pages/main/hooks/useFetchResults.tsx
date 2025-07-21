import type { DataItem } from '~types/types';

import { fetchRequest } from '~api/api';
import { normalizeError } from '~utils/utilities';
import { useEffect, useState } from 'react';

type ResultState = {
  results: DataItem[];
  loading: boolean;
  error: string | null;
};

export const useFetchResults = (query: string): ResultState => {
  const [state, setState] = useState<ResultState>({
    results: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setState({ loading: true, error: null, results: [] });
        const data = await fetchRequest(query, abortController.signal);
        if (!abortController.signal.aborted) {
          setState({
            results: data.data ?? [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setState({
          loading: false,
          error: normalizeError(error),
          results: [],
        });
      }
    };

    void fetchData();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return state;
};