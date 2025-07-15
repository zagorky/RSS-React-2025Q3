import { render, screen } from '@testing-library/react';
import { SearchForm } from '~pages/main/components/search-form/search-form';
import { expect } from 'vitest';

import {
  searchButton,
  searchInput,
  setupUserEvent,
} from '~/tests/test-utilties';

const specificQuery = 'friren';
const emptyQuery = '';

describe('Search Component', () => {
  test('should render search input and search button', () => {
    render(<SearchForm searchQuery="" onSubmit={() => {}} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(searchInput()).toBeInTheDocument();
    expect(searchButton()).toBeInTheDocument();
  });

  test('should display passed query', () => {
    render(<SearchForm searchQuery={specificQuery} onSubmit={() => {}} />);

    expect(searchInput()).toHaveValue('friren');
  });

  test('should call onSubmit with input value', async () => {
    const onSubmit = vi.fn();
    const { user } = setupUserEvent(
      <SearchForm searchQuery={emptyQuery} onSubmit={onSubmit} />
    );

    await user.type(searchInput(), specificQuery);
    await user.click(searchButton());

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('friren');
  });
});