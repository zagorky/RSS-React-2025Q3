import {
  apiEndpoints,
  apiUrl,
  endpointParameters,
  queryVariants,
} from '~config/app-config';
import { expect, test } from 'vitest';

import { getEmptyResponse, getSpecificQueryResponse } from '~/mocks/data';

test('request with query', async () => {
  const response = await fetch(
    `${apiUrl}/${apiEndpoints.anime}?${endpointParameters.search}=${queryVariants.specific}`
  );
  const data = getSpecificQueryResponse();
  await expect(response.json()).resolves.toEqual({
    data,
  });
});

test('request with no result', async () => {
  const response = await fetch(
    `${apiUrl}/${apiEndpoints.anime}?${endpointParameters.search}=${queryVariants.notFound}`
  );
  const data = getEmptyResponse();
  await expect(response.json()).resolves.toEqual({
    data,
  });
});
