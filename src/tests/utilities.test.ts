import { getSearchEndpoint } from '~api/api';
import { isDataItem } from '~types/type-guards';
import { downloadCSV, generateCSV } from '~utils/csv-helpers';
import {
  assertIsDataType,
  assertIsNonNullable,
  assertIsResponseOk,
  assertIsResponseType,
  getErrorMessageFromUnknown,
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
  describe('assertIsDataType', () => {
    const validApiResponse = specificQueryResponse.data[0];

    test('should not throw an error when data is valid', () => {
      expect(() =>
        assertIsDataType(validApiResponse, isDataItem)
      ).not.toThrow();
    });

    test('should throw if data is null', () => {
      expect(() => assertIsDataType(nullValue, isDataItem)).toThrow(
        'Invalid API response structure'
      );
    });
  });
});

describe('normalizeError', () => {
  test('should not throw an error when data is valid', () => {
    const error = new Error('Something went wrong');
    expect(getErrorMessageFromUnknown(error)).toBe('Something went wrong');
  });

  test('should throw if data is null', () => {
    expect(getErrorMessageFromUnknown('Some string')).toBe(
      'Fetching data error'
    );
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

describe('CSV helpers', () => {
  const mockData = specificQueryResponse.data;

  describe('generateCSV', () => {
    test('should generate correct headers', () => {
      const result = generateCSV(mockData);
      expect(result).toContain('mal_id,title');
    });

    test('should generate correct number of rows', () => {
      const result = generateCSV(mockData);
      const rows = result.split('\n');
      expect(rows.length).toBe(5);
    });

    test('should return only header for empty data', () => {
      const result = generateCSV([]);
      const rows = result.split('\n');

      expect(rows.length).toBe(1);
      expect(rows[0]).toBe('mal_id,title');
      expect(rows[1]).toBeFalsy();
    });
  });

  describe('downloadCSV', () => {
    beforeEach(() => {
      global.URL.createObjectURL = vi.fn(() => 'huh-url');
      global.URL.revokeObjectURL = vi.fn();
      window.HTMLAnchorElement.prototype.click = vi.fn();
    });

    const link = {
      href: '',
      tagName: 'a',
      download: '',
      click: vi.fn(),
    } as unknown as HTMLAnchorElement;

    test('should trigger click on the link element', () => {
      const clickSpy = vi.spyOn(link, 'click');

      downloadCSV(mockData, link);
      expect(clickSpy).toHaveBeenCalled();
    });

    test('should set correct href and download attributes', () => {
      downloadCSV(mockData, link);

      expect(link.href).toBe('huh-url');
      expect(link.download).toBe('4-items.csv');
    });

    it('should call revokeObjectURL after download', () => {
      vi.useFakeTimers();

      downloadCSV(mockData, link);
      vi.advanceTimersByTime(100);

      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('huh-url');
      vi.useRealTimers();
    });

    test('should not been called when linkReference is null', () => {
      const clickSpy = vi.spyOn(window.HTMLAnchorElement.prototype, 'click');
      downloadCSV(mockData, null);
      expect(clickSpy).not.toHaveBeenCalled();
    });

    test('should generate correct filename for empty array', () => {
      downloadCSV([], link);
      expect(link.download).toBe('0-items.csv');
    });
  });
});