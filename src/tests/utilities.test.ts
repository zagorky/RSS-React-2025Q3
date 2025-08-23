import { assertIsNonNullable, getFormEntries, isString, withDataTestId } from '~utils/utilities';

describe('withDataTestId', () => {
  test('should return object with data-testid property', () => {
    const testID = 'test-button';
    const result = withDataTestId(testID);

    expect(result).toEqual({
      'data-testid': 'test-button',
    });
  });

  test('should handle empty string', () => {
    const result = withDataTestId('');

    expect(result).toEqual({ 'data-testid': '' });
  });
});

describe('assertIsNonNullable', () => {
  test('should not throw for non-null values', () => {
    expect(() => assertIsNonNullable('test')).not.toThrow();
    expect(() => assertIsNonNullable(123)).not.toThrow();
    expect(() => assertIsNonNullable({})).not.toThrow();
    expect(() => assertIsNonNullable([])).not.toThrow();
    expect(() => assertIsNonNullable(0)).not.toThrow();
    expect(() => assertIsNonNullable(false)).not.toThrow();
  });

  test('should throw for null values', () => {
    expect(() => assertIsNonNullable(null)).toThrow('Nullish assertion Error: "null"');
    expect(() => assertIsNonNullable(null, 'Validation error')).toThrow(
      'Nullish assertion Error: "null"; Validation error'
    );
  });

  test('should throw for undefined values', () => {
    expect(() => assertIsNonNullable(undefined, 'Custom message')).toThrow(
      'Nullish assertion Error: "undefined"; Custom message'
    );
  });

  test('should accept multiple info arguments', () => {
    expect(() => assertIsNonNullable(null, 'Error', 'in', 'form')).toThrow(
      'Nullish assertion Error: "null"; Error in form'
    );
  });
});

describe('isString', () => {
  test('should return true for strings', () => {
    expect(isString('hello')).toBe(true);
    expect(isString('')).toBe(true);
    expect(isString('123')).toBe(true);
  });

  test('should return false for non-strings', () => {
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(true)).toBe(false);
  });
});

describe('getFormEntries', () => {
  test('should convert FormData to object', () => {
    const formData = new FormData();

    formData.append('name', 'John');
    formData.append('age', '30');
    formData.append('active', 'true');

    const result = getFormEntries<{ name: string; age: string; active: string }>(formData);

    expect(result).toEqual({
      name: 'John',
      age: '30',
      active: 'true',
    });
  });

  test('should handle empty FormData', () => {
    const formData = new FormData();
    const result = getFormEntries<Record<string, never>>(formData);

    expect(result).toEqual({});
  });
});