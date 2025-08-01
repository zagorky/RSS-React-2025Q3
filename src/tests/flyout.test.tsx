import { act, render, screen } from '@testing-library/react';
import { Flyout } from '~components/flyout/flyout';
import { describe, expect } from 'vitest';

import { specificQueryResponse } from '~/mocks/data';
import { useStore } from '~/store/store';

vi.mock('~utils/csv-helpers', () => ({
  downloadCSV: vi.fn(),
}));

describe('Flyout', () => {
  const card = specificQueryResponse.data[0];
  beforeEach(() => {
    useStore.getState().cleanSelectedCards();
  });

  test('should not appear when selectedCards is empty', () => {
    render(<Flyout />);
    expect(screen.queryByTestId('flyout')).toBeNull();
  });

  test('should contain 2 buttons (download and unselect all)', async () => {
    render(<Flyout />);
    act(() => {
      useStore.getState().addCard(card);
    });
    expect(
      await screen.findByRole('button', { name: /download/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
  });
});