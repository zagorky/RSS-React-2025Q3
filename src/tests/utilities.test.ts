import { getSearchEndpoint } from '~api/api';
import { apiEndpoints, apiUrl, endpointParameters } from '~config/app-config';
import {
  assertIsNonNullable,
  assertIsResponseOk,
  assertIsResponseType,
  normalizeError,
  retrieveQueryFormLS,
  setQueryToLS,
} from '~utils/utilities';
import { describe, expect, test } from 'vitest';

import { specificQueryResponse } from '~/tests/mocks/data';

describe('Local Storage utilities', () => {
  const validValue = 'sasarik the best mentor';
  const unicodeValue = '🥸';
  const emptyValue = '';
  const LS_KEY_FOR_TESTS = 'ZAGORKY:retrievedQuery';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('setQueryToLS', () => {
    test('should set correct validValue to LS', () => {
      setQueryToLS(validValue);
      expect(localStorage.getItem(LS_KEY_FOR_TESTS)).toBe(validValue);
    });

    test('should set empty string if the validValue is empty', () => {
      setQueryToLS(emptyValue);
      expect(localStorage.getItem(LS_KEY_FOR_TESTS)).toBe(emptyValue);
    });

    test('should store unicode characters correctly', () => {
      setQueryToLS(unicodeValue);
      expect(localStorage.getItem(LS_KEY_FOR_TESTS)).toBe(unicodeValue);
    });
  });

  describe('retrieveQueryFormLS', () => {
    test('should get correct validValue from LS', () => {
      localStorage.setItem(LS_KEY_FOR_TESTS, validValue);
      const result = retrieveQueryFormLS();
      expect(result).toBe(validValue);
    });

    test('should get empty string instead of null if the validValue is empty', () => {
      localStorage.setItem(LS_KEY_FOR_TESTS, emptyValue);
      const result = retrieveQueryFormLS();
      expect(result).toBe(emptyValue);
    });

    test('should return empty string if key does not exist', () => {
      const result = retrieveQueryFormLS();
      expect(result).toBe(emptyValue);
    });
  });
});

describe('Assert utilities', () => {
  const validValue = 'sasarik the best mentor';
  const unicodeValue = '🥸';
  const nullValue = null;
  const undefinedValue = undefined;

  describe('assertIsNonNullable', () => {
    test('should not throw an error when data is valid   ', () => {
      expect(() => assertIsNonNullable(validValue)).not.toThrow();
    });

    test('should throw when data is null', () => {
      expect(() => assertIsNonNullable(nullValue)).toThrow(
        'Nullish assertion Error'
      );
    });

    test('should throw when data is undefined', () => {
      expect(() => assertIsNonNullable(undefinedValue)).toThrow(
        'Nullish assertion Error'
      );
    });

    test('should include error info if it is provided', () => {
      expect(() => assertIsNonNullable(undefinedValue, unicodeValue)).toThrow(
        unicodeValue
      );
    });
  });
  describe('assertIsResponseOk', () => {
    const invalidResponse = {
      ok: false,
      status: 400,
    } as Response;

    const validResponse = {
      ok: true,
      status: 200,
    } as Response;

    test('should not throw an error when data is valid', () => {
      expect(() => assertIsResponseOk(validResponse)).not.toThrow();
    });

    test('should throw an error when data is not valid', () => {
      expect(() => assertIsResponseOk(invalidResponse)).toThrow(
        'Response status: 400'
      );
    });
  });
  describe('assertIsResponseType', () => {
    const validApiResponse = specificQueryResponse;

    test('should not throw an error when data is valid', () => {
      expect(() => assertIsResponseType(validApiResponse)).not.toThrow();
    });
    test('should throw if data is null', () => {
      expect(() => assertIsResponseType(nullValue)).toThrow(
        'Invalid API response structure'
      );
    });
  });
});

describe('normalizeError', () => {
  test('should not throw an error when data is valid', () => {
    const error = new Error('Something went wrong');
    expect(normalizeError(error)).toBe('Something went wrong');
  });
  test('should throw if data is null', () => {
    expect(normalizeError('Some string')).toBe('Fetching data error');
  });
});

describe('getSearchEndpoint', () => {
  test('should return base URL when no query provided', () => {
    const result = getSearchEndpoint();
    expect(result).toBe(`${apiUrl}/${apiEndpoints.anime}`);
  });

  test('should return search URL with trimmed query', () => {
    const notTrimmedQuery = '  demon slayer  ';
    const trimmedQuery = 'demon slayer';
    const result = getSearchEndpoint(notTrimmedQuery);
    expect(result).toBe(
      `${apiUrl}/${apiEndpoints.anime}?${endpointParameters.search}=${trimmedQuery}`
    );
  });

  test('should handle undefined query', () => {
    const result = getSearchEndpoint();
    expect(result).toBe(`${apiUrl}/${apiEndpoints.anime}`);
  });
});