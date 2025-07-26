import type { ApiResponseType } from '~types/types';

import { LS_KEY } from '~config/app-config';
import { isResponseType } from '~types/type-guards';

export const retrieveQueryFormLS = () => {
  return localStorage.getItem(LS_KEY) ?? '';
};

export const setQueryToLS = (value: string) => {
  localStorage.setItem(LS_KEY, value);
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
