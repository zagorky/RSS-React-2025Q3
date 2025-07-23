import {
  apiEndpoints,
  apiUrl,
  endpointParameters,
  ITEM_PER_PAGE,
} from '~config/app-config';
import { hasProperty, isObject } from '~types/type-guards';
import {
  assertIsDataType,
  assertIsResponseOk,
  assertIsResponseType,
} from '~utils/utilities';

export const getSearchEndpoint = (
  options: {
    query?: string;
    id?: string | number;
    page?: number;
  } = {}
) => {
  const { query, id, page = 1 } = options;

  const baseUrl = `${apiUrl}/${apiEndpoints.anime}`;

  if (id) {
    return `${baseUrl}/${id}`;
  }

  const queryParameters = new URLSearchParams();
  queryParameters.append(endpointParameters.limit, ITEM_PER_PAGE.toString());

  if (page > 0) {
    queryParameters.append(endpointParameters.page, page.toString());
  }

  if (query?.trim()) {
    queryParameters.append(endpointParameters.search, query.trim());
  }

  const queryString = queryParameters.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const fetchRequest = async (
  query?: string,
  signal?: AbortSignal,
  page?: number,
  id?: string | number
) => {
  const url = getSearchEndpoint({ query, page, id });
  const response = await fetch(url, { signal: signal });

  assertIsResponseOk(response);

  const data: unknown = await response.json();

  assertIsResponseType(data);

  return data;
};

export const fetchById = async (id: string | number, signal?: AbortSignal) => {
  const url = getSearchEndpoint({ id });
  const response = await fetch(url, { signal });

  assertIsResponseOk(response);

  const responseData: unknown = await response.json();

  if (!isObject(responseData) || !hasProperty('data', responseData)) {
    throw new Error('Invalid API response: missing data property');
  }

  const data = responseData.data;
  assertIsDataType(data);

  return data;
};
