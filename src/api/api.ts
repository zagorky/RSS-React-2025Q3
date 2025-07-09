import { apiEndpoints, apiUrl, endpointParameters } from '~config/app-config';
import { isResponseType } from '~types/type-guards';

export const getSearchEndpoint = (query?: string) => {
  return query
    ? `${apiUrl}/${apiEndpoints.anime}?${endpointParameters.search}=${query.trim()}`
    : `${apiUrl}/${apiEndpoints.anime}`;
};

export const fetchRequest = async (query?: string, signal?: AbortSignal) => {
  const url = getSearchEndpoint(query);
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
