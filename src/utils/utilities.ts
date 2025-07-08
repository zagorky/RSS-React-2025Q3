import { LS_KEY } from '~config/app-config';

export const retrieveQueryFormLS = () => {
  return localStorage.getItem(LS_KEY) ?? '';
};

export const setQueryToLS = (value: string) => {
  localStorage.setItem(LS_KEY, value);
};

export const normalizeError = (error: unknown) => {
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
