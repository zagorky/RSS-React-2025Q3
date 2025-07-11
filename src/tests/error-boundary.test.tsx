import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from '~/error-boundary';

const fallbackMock = vi.fn((error: Error) => (
  <div data-testid="error-fallback">{error.message}</div>
));

const Child = () => {
  throw new Error('Child error');
};

describe('Error Boundary', () => {
  test('should catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary fallback={fallbackMock}>
        <Child />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });
});
