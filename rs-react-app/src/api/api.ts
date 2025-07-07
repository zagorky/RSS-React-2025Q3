import type { ResponseType } from '~types/types';

import { apiEndpoints, apiUrl } from '~config/app-config';

const getUrl = (query?: string) => {
  return query
    ? `${apiUrl}/${apiEndpoints.anime}?q=${query.trim()}`
    : `${apiUrl}/${apiEndpoints.anime}`;
};

export const fetchRequest = async (
  query?: string,
  signal?: AbortSignal
): Promise<ResponseType> => {
  const url = getUrl(query);
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  return response.json();
};

await fetchRequest('').then((d) => console.log(d));
