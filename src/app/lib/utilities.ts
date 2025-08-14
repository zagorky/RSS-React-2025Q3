import type { ApiResponseType } from '~types/types';

import { hasProperty, isObject, isResponseType } from '~types/type-guards';

export const generateHref = ({
  query,
  page,
}: {
  query: string;
  page: string;
}) => {
  const q = query ? `?query=${query}` : '';
  const p = page ? `page=${page}` : '';
  return `?query=${q}&page=${p}`;
};

export const getErrorMessageFromUnknown = (error: unknown) => {
  return error instanceof Error ? error.message : 'Fetching data error';
};

export const withDataTestId = (testID: string) => {
  return {
    'data-testid': testID,
  };
};

export function assertIsNonNullable<T>(
  value: unknown,
  ...infos: unknown[]
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(
      `Nullish assertion Error: "${String(value)}"; ${infos.join(' ')}`
    );
  }
}

export function assertIsResponseOk(
  response: Response,
  ...infos: unknown[]
): asserts response is Response & { ok: true } {
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}; ${infos.join(' ')}`);
  }
}

export function assertIsResponseType(
  data: unknown,
  ...infos: unknown[]
): asserts data is ApiResponseType {
  if (!isResponseType(data)) {
    throw new Error(
      `Invalid API response structure: "${String(data)}"; ${infos.join(' ')}`
    );
  }
}

export function assertIsApiResponseWithData(
  data: unknown,
  property: string
): asserts data is { data: unknown } {
  if (!isObject(data) && !hasProperty('data', data)) {
    throw new Error(`Invalid API response: missing ${property} property`);
  }
}

export function assertIsDataType<T>(
  data: unknown,
  typeGuard: (data: unknown) => boolean,
  ...infos: unknown[]
): asserts data is T {
  if (!typeGuard(data)) {
    throw new Error(
      `Invalid API response structure: "${String(data)}"; ${infos.join(' ')}`
    );
  }
}
