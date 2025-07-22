import { apiEndpoints, apiUrl, endpointParameters } from '~config/app-config';
import { assertIsResponseOk, assertIsResponseType } from '~utils/utilities';

export const getSearchEndpoint = (
  query?: string | number,
  page: number = 1,
  limit: number = 10
) => {
  const queryParameters = new URLSearchParams();

  if (page && page > 0) {
    queryParameters.append(endpointParameters.page, page.toString());
  }

  if (limit && limit > 0) {
    queryParameters.append(endpointParameters.limit, limit.toString());
  }

  const baseUrl = `${apiUrl}/${apiEndpoints.anime}`;

  if (typeof query === 'number') {
    return `${baseUrl}/${query}`;
  }

  if (query && query.trim() !== '') {
    queryParameters.append(endpointParameters.search, query.trim());
  }

  const queryString = queryParameters.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const fetchRequest = async (query: string, signal?: AbortSignal) => {
  const url = getSearchEndpoint(query);
  const response = await fetch(url, { signal: signal });

  assertIsResponseOk(response);

  const data: unknown = await response.json();

  assertIsResponseType(data);

  return data;
};
