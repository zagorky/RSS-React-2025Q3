import { render } from '@testing-library/react';
import { queryVariants } from '~config/app-config';
import { ResultsSection } from '~pages/main/components/results-section/results-section';

describe('Results Component', () => {
  test('should renders correct number of items when data is provided', () => {
    render(<ResultsSection searchQuery={queryVariants.specific} />);
  });

  test('should displays "no results" message when data array is empty', () => {
    render(<ResultsSection searchQuery={queryVariants.notFound} />);
  });

  test('should shows loading state while fetching data', () => {
    render(<ResultsSection searchQuery={queryVariants.specific} />);
  });

  test('should correctly displays item names and descriptions', () => {
    render(<ResultsSection searchQuery={queryVariants.specific} />);
  });

  test('should handles missing or undefined data gracefully', () => {
    render(<ResultsSection searchQuery={queryVariants.specific} />);
  });

  test('should displays error message when API call fails', () => {
    render(<ResultsSection searchQuery={queryVariants.specific} />);
  });

  test('should shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
    render(<ResultsSection searchQuery={queryVariants.specific} />);
  });
});
