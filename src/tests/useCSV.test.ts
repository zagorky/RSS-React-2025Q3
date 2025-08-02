import { renderHook } from '@testing-library/react';
import { useCSV } from '~hooks/useCSV';
import { generateCSV } from '~utils/csv-helpers';
import { describe, expect } from 'vitest';

import { specificQueryResponse } from '~/mocks/data';

vi.mock('~utils/csv-helpers', () => ({
  generateCSV: vi.fn(() => 'mocked,csv,data'),
}));

describe('useCSV', () => {
  const mockAnchor = {
    href: '',
    download: '',
    click: vi.fn(),
  } as unknown as HTMLAnchorElement;

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => 'huh-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should return ref and download function', () => {
    const { result } = renderHook(() => useCSV(specificQueryResponse.data));

    expect(result.current.linkReference).toBeDefined();
    expect(result.current.downloadCSV).toBeDefined();
    expect(result.current.downloadCSV).toBeInstanceOf(Function);
  });

  test('should setup download when anchor exists', () => {
    const { result } = renderHook(() => useCSV(specificQueryResponse.data));
    result.current.linkReference.current = mockAnchor;
    result.current.downloadCSV();

    expect(generateCSV).toHaveBeenCalledWith(specificQueryResponse.data);
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(mockAnchor.href).toBe('huh-url');
    expect(mockAnchor.download).toBe('4-items.csv');
    expect(mockAnchor.click).toHaveBeenCalled();
  });

  it('should revoke previous URL on new download', () => {
    const { result } = renderHook(() => useCSV(specificQueryResponse.data));
    result.current.linkReference.current = mockAnchor;
    result.current.downloadCSV();
    result.current.downloadCSV();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('huh-url');
    expect(URL.createObjectURL).toHaveBeenCalledTimes(2);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() =>
      useCSV(specificQueryResponse.data)
    );
    result.current.linkReference.current = mockAnchor;
    result.current.downloadCSV();
    unmount();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('huh-url');
  });
});
