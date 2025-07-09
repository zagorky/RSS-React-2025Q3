import {
  apiEndpoints,
  apiUrl,
  endpointParameters,
  queryVariants,
} from '~config/app-config';
import { describe, expect, test } from 'vitest';

import {
  getEmptyQueryResponse,
  getEmptyResponse,
  getSpecificQueryResponse,
} from '~/mocks/data';

describe('Api Integration', () => {
  test('should handle request without query', async () => {
    const response = await fetch(`${apiUrl}/${apiEndpoints.anime}`);
    const data = getEmptyQueryResponse();
    await expect(response.json()).resolves.toEqual({
      data,
    });
  });

  test('should handle request with query', async () => {
    const response = await fetch(
      `${apiUrl}/${apiEndpoints.anime}?${endpointParameters.search}=${queryVariants.specific}`
    );
    const data = getSpecificQueryResponse();
    await expect(response.json()).resolves.toEqual({
      data,
    });
  });

  test('should handle request with no result', async () => {
    const response = await fetch(
      `${apiUrl}/${apiEndpoints.anime}?${endpointParameters.search}=${queryVariants.notFound}`
    );
    const data = getEmptyResponse();
    await expect(response.json()).resolves.toEqual({
      data,
    });
  });

  test('should handle bad request', async () => {
    const response = await fetch(`${apiUrl}/${endpointParameters.badRequest}`);
    expect(response.status).toBe(400);
  });
});
