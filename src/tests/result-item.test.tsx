import { render } from '@testing-library/react';
import { queryVariants } from '~config/app-config';
import { ResultsSection } from '~pages/main/components/results-section/results-section';

describe('Result Item', () => {
  test('should displays item name and description correctly', () => {
    render(<ResultsSection searchQuery={queryVariants.specific} />);
  });

  test('should handles missing props gracefully', () => {
    render(<ResultsSection searchQuery={queryVariants.notFound} />);
  });
});
