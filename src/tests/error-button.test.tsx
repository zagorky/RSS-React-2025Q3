import { render, screen } from '@testing-library/react';
import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { ErrorButton } from '~pages/main/components/error-section/error-button';
import { setupUserEvent } from '~utils/utilities';
import { expect } from 'vitest';

import { ErrorBoundary } from '~/error-boundary';

describe('Error Button', () => {
  test('should render error button', () => {
    render(<ErrorButton />);

    expect(screen.getByTestId('throw-error-button')).toBeInTheDocument();
  });

  test('should triggers error boundary fallback UI on click', async () => {
    const { user } = setupUserEvent(
      <ErrorBoundary
        fallback={(error: Error) => <ErrorFallback error={error} />}
      >
        <ErrorButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByTestId('throw-error-button'));
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });
});
