import type { Base64String } from '~/store/use-form-store';

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

export const isString = (data: unknown): data is string => {
  return typeof data === 'string';
};

export const convertToBase64 = (file: File) => {
  return new Promise<Base64String>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as Base64String);
    });
    reader.addEventListener('error', () => {
      reject(new Error('Failed to read file'));
    });
    reader.readAsDataURL(file);
  });
};