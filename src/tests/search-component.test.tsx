import { fireEvent, render, screen } from '@testing-library/react';
import { LS_KEY } from '~config/app-config';
import { SearchForm } from '~pages/main/components/search-form/search-form';
import { expect } from 'vitest';

import { getItemSpy, setItemSpy } from '~/mocks/locale-storage';

const input = () => screen.getByTestId('search-form-input') as HTMLInputElement;
const button = () => screen.getByTestId('search-form-submit-button');

describe('Search Component', () => {
  afterEach(() => {
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    localStorage.clear();
  });

  test('should render search input and search button', () => {
    render(<SearchForm onSubmit={() => {}} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-form-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-form-submit-button')).toBeInTheDocument();
  });

  test('should displays previously saved search term from localStorage', () => {
    getItemSpy.mockReturnValue('test1');
    render(<SearchForm onSubmit={() => {}} />);

    expect(getItemSpy).toHaveBeenCalledWith(LS_KEY);
    expect(input().value).toBe('test1');
  });

  test('should shows empty input when no saved term exists', () => {
    getItemSpy.mockReturnValue(null);
    render(<SearchForm onSubmit={() => {}} />);

    expect(getItemSpy).toHaveBeenCalledWith(LS_KEY);
    expect(input().value).toBe('');
  });

  test('should saves search term to localStorage when search button is clicked', () => {
    const onSubmit = vi.fn();
    render(<SearchForm onSubmit={onSubmit} />);

    fireEvent.change(input(), { target: { value: 'naruto' } });
    fireEvent.click(button());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, 'naruto');
    expect(onSubmit).toHaveBeenCalledWith('naruto');
  });

  test('should retrieves saved search term', () => {
    getItemSpy.mockReturnValue('test1');
    render(<SearchForm onSubmit={() => {}} />);

    expect(getItemSpy).toHaveBeenCalledWith(LS_KEY);
    expect(input().value).toBe('test1');
  });

  test('should overwrites existing localStorage value when new search is performed', () => {
    getItemSpy.mockReturnValue('oldQuery');
    const onSubmit = vi.fn();
    render(<SearchForm onSubmit={onSubmit} />);

    expect(input().value).toBe('oldQuery');

    fireEvent.change(input(), { target: { value: 'newQuery' } });
    fireEvent.click(button());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, 'newQuery');
    expect(onSubmit).toHaveBeenCalledWith('newQuery');
  });
});
