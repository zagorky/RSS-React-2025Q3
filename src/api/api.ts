import { apiEndpoints, apiUrl, endpointParameters } from '~config/app-config';
import { assertIsResponseOk, assertIsResponseType } from '~utils/utilities';

export const getSearchEndpoint = (query?: string) => {
  return query
    ? `${apiUrl}/${apiEndpoints.anime}?${endpointParameters.search}=${query.trim()}`
    : `${apiUrl}/${apiEndpoints.anime}`;
};

export const fetchRequest = async (query: string, signal?: AbortSignal) => {
  const url = getSearchEndpoint(query);
  const response = await fetch(url, { signal: signal });

  assertIsResponseOk(response);

  const data: unknown = await response.json();

  assertIsResponseType(data);

  return data;
};
