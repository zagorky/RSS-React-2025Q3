import { render, screen } from '@testing-library/react';
import { ErrorButton } from '~pages/main/components/error-section/error-button';
import { expect } from 'vitest';

describe('Error Button', () => {
  test('should render error button', () => {
    render(<ErrorButton />);
    expect(screen.getByTestId('throw-error-button')).toBeInTheDocument();
  });

  test('should throws error when test button is clicked', async () => {});

  test('should triggers error boundary fallback UI', async () => {
    // const { user } = setupUserEvent(<ErrorButton />);
    // await user.click(screen.getByTestId('throw-error-button'));
    // expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });
});
