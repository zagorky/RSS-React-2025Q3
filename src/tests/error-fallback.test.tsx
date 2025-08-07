import { render, screen } from '@testing-library/react';
import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { BrowserRouter } from 'react-router';

describe('ErrorFallback', () => {
  const mockError = new Error('Test error message');

  test('should renders correctly wtesth Error object', () => {
    render(<ErrorFallback error={mockError} />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByTestId('error-fallback-button')).toBeInTheDocument();
  });

  test('should has a working refresh button', () => {
    render(<ErrorFallback error={mockError} />, { wrapper: BrowserRouter });

    const button = screen.getByTestId('error-fallback-button');
    expect(button).toBeInTheDocument();
    expect(button).toContainElement(screen.getByText('Refresh Page'));
  });
});