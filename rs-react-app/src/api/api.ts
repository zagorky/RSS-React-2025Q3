import type { ResponseType } from '~types/types';

import { apiEndpoints, apiUrl } from '~config/app-config';

const getUrl = (query?: string) => {
  return query
    ? `${apiUrl}/${apiEndpoints.anime}?q=${query.trim()}`
    : `${apiUrl}/${apiEndpoints.anime}`;
};

export const fetchRequest = async (query?: string, signal?: AbortSignal) => {
  const url = getUrl(query);
  try {
    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data: unknown = await response.json();
    return data as ResponseType;
  } catch (error) {
    console.error(error);
    throw new Error('Error from fetchRequest');
  }
};
