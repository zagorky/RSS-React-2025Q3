import { getSearchEndpoint } from '~api/api';
import {
  assertIsDataType,
  assertIsNonNullable,
  assertIsResponseOk,
  assertIsResponseType,
  normalizeError,
} from '~utils/utilities';
import { describe, expect, test } from 'vitest';

import { specificQueryResponse } from '~/tests/mocks/data';

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
  describe('assertIsDataType', () => {
    const validApiResponse = specificQueryResponse.data[0];

    test('should not throw an error when data is valid', () => {
      expect(() => assertIsDataType(validApiResponse)).not.toThrow();
    });

    test('should throw if data is null', () => {
      expect(() => assertIsDataType(nullValue)).toThrow(
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
    expect(result).toBe('https://api.jikan.moe/v4/anime?limit=6&page=1');
  });

  test('should return search URL with trimmed query', () => {
    const notTrimmedQuery = '  demon slayer  ';
    const result = getSearchEndpoint({ query: notTrimmedQuery });
    console.log(result);
    expect(result).toBe(
      'https://api.jikan.moe/v4/anime?limit=6&page=1&q=demon+slayer'
    );
  });

  test('should handle undefined query', () => {
    const undefinedResult = undefined;
    const result = getSearchEndpoint(undefinedResult);
    expect(result).toBe('https://api.jikan.moe/v4/anime?limit=6&page=1');
  });

  test('should return URL with query and custom page', () => {
    const result = getSearchEndpoint({ query: 'one piece', page: 3 });
    expect(result).toBe(
      `https://api.jikan.moe/v4/anime?limit=6&page=3&q=one+piece`
    );
  });

  test('should return URL with page only', () => {
    const result = getSearchEndpoint({ page: 2 });
    expect(result).toBe(`https://api.jikan.moe/v4/anime?limit=6&page=2`);
  });

  test('should not append query if it is empty or only spaces', () => {
    const result = getSearchEndpoint({ query: '   ' });
    expect(result).toBe(`https://api.jikan.moe/v4/anime?limit=6&page=1`);
  });

  test('should ignore query and page if id is provided', () => {
    const result = getSearchEndpoint({
      id: 456,
      query: 'ignored query',
      page: 5,
    });
    expect(result).toBe(`https://api.jikan.moe/v4/anime/456`);
  });
});
