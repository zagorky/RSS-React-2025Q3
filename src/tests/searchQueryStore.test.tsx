import { act, renderHook } from '@testing-library/react';
import { navigation } from '~config/navigation';
import { test } from 'vitest';

import {
  useQueryStore,
  useQueryStoreActions,
  useSearchQuery,
} from '~/store/search-query-store';

describe('useQueryStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useQueryStore());
    act(() => {
      result.current.actions.setSearchQuery('');
      result.current.actions.setPage('1');
    });
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() => useQueryStore());

    expect(result.current.query).toBe('');
    expect(result.current.page).toBe('1');
  });

  test('setSearchQuery should updates query and resets page', () => {
    const { result } = renderHook(() => useQueryStoreActions());

    act(() => {
      result.current.setSearchQuery('test query');
    });

    const state = renderHook(() => useQueryStore()).result.current;
    expect(state.query).toBe('test query');
    expect(state.page).toBe('1');
  });

  test('setSearchQuery should trims whitespace', () => {
    const { result } = renderHook(() => useQueryStoreActions());

    act(() => {
      result.current.setSearchQuery('  trimmed  ');
    });

    const state = renderHook(() => useQueryStore()).result.current;
    expect(state.query).toBe('trimmed');
  });

  test('setPage should updates page number', () => {
    const { result } = renderHook(() => useQueryStoreActions());

    act(() => {
      result.current.setPage('5');
    });

    const state = renderHook(() => useQueryStore()).result.current;
    expect(state.page).toBe('5');
  });

  test('getNewUrl should generates correct URL with query', () => {
    const { result: actions } = renderHook(() => useQueryStoreActions());
    const { result: store } = renderHook(() => useQueryStore());

    act(() => {
      store.current.actions.setSearchQuery('naruto');
    });

    const url = actions.current.getNewUrl();
    expect(url).toBe(`${navigation.main}?q=naruto&page=1`);
  });

  test('getNewUrl should returns base URL when query is empty', () => {
    const { result } = renderHook(() => useQueryStoreActions());
    const url = result.current.getNewUrl();
    expect(url).toBe(`${navigation.main}?`);
  });

  test('syncWithUrl should updates state from URL params', () => {
    const testUrl = 'https://example.com/main?q=onepiece&page=3';
    const { result } = renderHook(() => useQueryStoreActions());

    act(() => {
      result.current.syncWithUrl(testUrl);
    });

    const state = renderHook(() => useQueryStore()).result.current;
    expect(state.query).toBe('onepiece');
    expect(state.page).toBe('3');
  });

  test('syncWithUrl should prefers existing store query over URL', () => {
    const testUrl = 'https://example.com/main?q=url-query&page=2';
    const { result: actions } = renderHook(() => useQueryStoreActions());
    const { result: store } = renderHook(() => useQueryStore());

    act(() => {
      store.current.actions.setSearchQuery('store-query');
      actions.current.syncWithUrl(testUrl);
    });

    expect(store.current.query).toBe('store-query');
    expect(store.current.page).toBe('2');
  });

  test('useSearchQuery should returns current query', () => {
    const { result: actions } = renderHook(() => useQueryStoreActions());

    act(() => {
      actions.current.setSearchQuery('selector-query');
    });

    const { result } = renderHook(() => useSearchQuery());
    expect(result.current).toBe('selector-query');
  });
});