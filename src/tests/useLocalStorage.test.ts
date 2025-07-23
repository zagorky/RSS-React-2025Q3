import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { describe } from 'vitest';

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

const key = 'huh';

describe('useLocalStorage', () => {
  test('should initialize searchQuery from localStorage ', () => {
    mockLocalStorage.getItem.mockReturnValue('huh');

    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current.searchQuery).toBe('huh');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
  });

  test('should initialize searchQuery with empty string if localStorage is empty', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current.searchQuery).toBe('');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
  });

  test('should save value to localStorage and update searchQuery', () => {
    mockLocalStorage.getItem.mockReturnValue('huh');

    const { result } = renderHook(() => useLocalStorage(key));

    act(() => {
      result.current.setSearchQueryToLS('heh');
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(key, 'heh');
    expect(result.current.searchQuery).toBe('heh');
  });
});