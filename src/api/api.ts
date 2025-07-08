import { apiEndpoints, apiUrl } from '~config/app-config';
import { isResponseType } from '~types/type-guards';

const getUrl = (query?: string) => {
  return query
    ? `${apiUrl}/${apiEndpoints.anime}?q=${query.trim()}`
    : `${apiUrl}/${apiEndpoints.anime}`;
};

export const fetchRequest = async (query?: string, signal?: AbortSignal) => {
  const url = getUrl(query);
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isResponseType(data)) {
    throw new Error('Invalid API response structure');
  }
  return data;
};
