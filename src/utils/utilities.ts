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

export const getFormEntries = <T extends Record<PropertyKey, unknown>>(form: FormData) => {
  return Object.fromEntries(form.entries()) as {
    [K in keyof T]: FormDataEntryValue;
  };
};

export const getFile = (value: unknown) => {
  if (value instanceof FileList) {
    const value_ = value.item(0);

    assertIsNonNullable(value_, 'Validation error');

    return value_;
  }
  if (value instanceof File) {
    return value;
  }

  throw new Error('expected file type');
};