import { fireEvent, render, screen } from '@testing-library/react';
import { LS_KEY, queryVariants } from '~config/app-config';
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
    render(<SearchForm searchQuery="" onSubmit={() => {}} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-form-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-form-submit-button')).toBeInTheDocument();
  });

  test('should shows empty input when no saved term exists', () => {
    render(<SearchForm searchQuery="" onSubmit={() => {}} />);
    expect(input().value).toBe('');
  });

  test('should saves search term to localStorage when search button is clicked', () => {
    const onSubmit = vi.fn();
    render(<SearchForm searchQuery="" onSubmit={onSubmit} />);

    fireEvent.change(input(), { target: { value: queryVariants.specific } });
    fireEvent.click(button());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, queryVariants.specific);
    expect(onSubmit).toHaveBeenCalledWith(queryVariants.specific);
  });

  test('should overwrites existing localStorage value when new search is performed', () => {
    const onSubmit = vi.fn();
    render(<SearchForm searchQuery="oldQuery" onSubmit={onSubmit} />);

    expect(input().value).toBe('oldQuery');

    fireEvent.change(input(), { target: { value: 'newQuery' } });
    fireEvent.click(button());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, 'newQuery');
    expect(onSubmit).toHaveBeenCalledWith('newQuery');
  });
});
