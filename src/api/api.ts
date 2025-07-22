import {
  apiEndpoints,
  apiUrl,
  endpointParameters,
  ITEM_PER_PAGE,
} from '~config/app-config';
import { assertIsResponseOk, assertIsResponseType } from '~utils/utilities';

export const getSearchEndpoint = (
  query?: string | number,
  page: number = 1
) => {
  const queryParameters = new URLSearchParams();
  queryParameters.append(endpointParameters.limit, ITEM_PER_PAGE.toString());

  if (page && page > 0) {
    queryParameters.append(endpointParameters.page, page.toString());
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

export const fetchRequest = async (
  query: string,
  signal?: AbortSignal,
  page?: number
) => {
  const url = getSearchEndpoint(query, page);
  const response = await fetch(url, { signal: signal });

  assertIsResponseOk(response);

  const data: unknown = await response.json();

  assertIsResponseType(data);

  return data;
};
