import type { ApiResponseType, DataItem } from '~types/types';

import {
  apiEndpoints,
  apiUrl,
  endpointParameters,
  ITEM_PER_PAGE,
} from '~config/app-config';
import {
  assertIsApiResponseWithData,
  assertIsDataType,
  assertIsResponseOk,
} from '~lib/utilities';
import { isDataItem, isResponseType } from '~types/type-guards';

type FetchAnimeDataOption = {
  query?: string;
  signal?: AbortSignal;
  page?: number;
};

type GetSearchEndpointOption = {
  query?: string;
  id?: string | number;
  page?: number;
};

type FetchAnimeDataItemOption = { id: string | number; signal?: AbortSignal };

const baseUrl = `${apiUrl}/${apiEndpoints.anime}`;

export const getSearchEndpoint = (options: GetSearchEndpointOption = {}) => {
  const { query, id, page = 1 } = options;

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

export const fetchAnimeData = async ({ query, page }: FetchAnimeDataOption) => {
  const url = getSearchEndpoint({ query, page });
  const response = await fetch(url, {
    // next: { revalidate: 60 },
    cache: 'force-cache',
  });

  assertIsResponseOk(response);

  const data: unknown = await response.json();

  assertIsDataType<ApiResponseType>(data, isResponseType);

  return data;
};

export const fetchAnimeDataItem = async ({
  id,
  signal,
}: FetchAnimeDataItemOption) => {
  const url = getSearchEndpoint({ id });
  const response = await fetch(url, { signal });

  assertIsResponseOk(response);

  const responseData: unknown = await response.json();

  assertIsApiResponseWithData(responseData, 'data');

  const data = responseData.data;

  assertIsDataType<DataItem>(data, isDataItem);

  return data;
};