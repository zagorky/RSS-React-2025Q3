export const withDataTestId = (testID: string) => {
  return {
    'data-testid': testID,
  };
};

export function assertIsNonNullable<T>(value: unknown, ...infos: unknown[]): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Nullish assertion Error: "${String(value)}"; ${infos.join(' ')}`);
  }
}

export const getErrorMessageFromUnknown = (error: unknown) => {
  return error instanceof Error ? error.message : 'Fetching data error';
};

export const formatNumber = (value: number | undefined): string => {
  if (value === undefined) {
    return 'N/A';
  }
  if (value === 0) {
    return '0';
  }

  if (Math.abs(value) < 0.01) {
    return value.toExponential(2);
  }

  if (Math.abs(value) > 1000) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
};