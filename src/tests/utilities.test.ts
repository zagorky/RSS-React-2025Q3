import type { ApiResponseType } from '~types/types';

import { LS_KEY } from '~config/app-config';
import {
  assertIsNonNullable,
  assertIsResponseOk,
  assertIsResponseType,
  normalizeError,
  retrieveQueryFormLS,
  setQueryToLS,
} from '~utils/utilities';
import { describe, expect, test } from 'vitest';

import { getSpecificQueryResponse } from '~/mocks/data';
import { getItemSpy, setItemSpy } from '~/mocks/mocked-functions';

const validValue = 'sasarik the best mentor';
const unicodeValue = '🥸';
const emptyValue = '';
const nullValue = null;
const undefinedValue = undefined;
const validResponse = {
  ok: true,
  status: 200,
} as Response;
const invalidResponse = {
  ok: false,
  status: 400,
} as Response;
const validApiResponse = getSpecificQueryResponse() as ApiResponseType;

describe('Local Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('setQueryToLS', () => {
    test('should set correct validValue to LS', () => {
      setQueryToLS(validValue);
      expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, validValue);
      expect(localStorage.getItem(LS_KEY)).toBe(validValue);
    });

    test('should set empty string if the validValue is empty', () => {
      setQueryToLS(emptyValue);
      expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, emptyValue);
      expect(localStorage.getItem(LS_KEY)).toBe(emptyValue);
    });

    test('should store unicode characters correctly', () => {
      setQueryToLS(unicodeValue);
      expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, unicodeValue);
      expect(localStorage.getItem(LS_KEY)).toBe(unicodeValue);
    });
  });

  describe('retrieveQueryFormLS', () => {
    test('should get correct validValue from LS', () => {
      localStorage.setItem(LS_KEY, validValue);
      const result = retrieveQueryFormLS();
      expect(getItemSpy).toHaveBeenCalledWith(LS_KEY);
      expect(result).toBe(validValue);
    });

    test('should get empty string instead of null if the validValue is empty', () => {
      localStorage.setItem(LS_KEY, emptyValue);
      const result = retrieveQueryFormLS();
      expect(getItemSpy).toHaveBeenCalledWith(LS_KEY);
      expect(result).toBe(emptyValue);
    });

    test('should return empty string if key does not exist', () => {
      const result = retrieveQueryFormLS();
      expect(getItemSpy).toHaveBeenCalledWith(LS_KEY);
      expect(result).toBe(emptyValue);
    });
  });
});

describe('Assert utilities', () => {
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
