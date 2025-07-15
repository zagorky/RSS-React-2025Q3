import { render, screen } from '@testing-library/react';
import { SearchForm } from '~pages/main/components/search-form/search-form';
import { expect } from 'vitest';

import { queryVariants } from '~/tests/mocks/query-variants';
import {
  searchButton,
  searchInput,
  setupUserEvent,
} from '~/tests/test-utilties';

describe('Search Component', () => {
  test('should render search input and search button', () => {
    render(<SearchForm searchQuery="" onSubmit={() => {}} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(searchInput()).toBeInTheDocument();
    expect(searchButton()).toBeInTheDocument();
  });

  test('should display passed query', () => {
    render(
      <SearchForm searchQuery={queryVariants.specific} onSubmit={() => {}} />
    );

    expect(searchInput()).toHaveValue(queryVariants.specific);
  });

  test('should call onSubmit with input value', async () => {
    const onSubmit = vi.fn();
    const { user } = setupUserEvent(
      <SearchForm searchQuery={queryVariants.empty} onSubmit={onSubmit} />
    );

    await user.type(searchInput(), queryVariants.specific);
    await user.click(searchButton());

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(queryVariants.specific);
  });

  test('should restore previous value after call onSubmit with new input value', async () => {
    const onSubmit = vi.fn();
    const { user } = setupUserEvent(
      <SearchForm searchQuery={queryVariants.notFound} onSubmit={onSubmit} />
    );

    await user.clear(searchInput());
    await user.type(searchInput(), queryVariants.specific);
    await user.click(searchButton());

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(queryVariants.specific);
  });
});
