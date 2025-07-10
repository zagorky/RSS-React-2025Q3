import { render, screen } from '@testing-library/react';
import { SearchForm } from '~pages/main/components/search-form/search-form';

describe('Search Component', () => {
  test('should render search input and search button', () => {
    render(<SearchForm onSubmit={() => {}} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-form-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-form-submit-button')).toBeInTheDocument();
  });

  test('should displays previously saved search term from localStorage', () => {});
  test('should shows empty input when no saved term exists', () => {});
  test('should updates input value when user types', () => {});
  test('should saves search term to localStorage when search button is clicked', () => {});
  test('should retrieves saved search term', () => {});
  test('should overwrites existing localStorage value when new search is performed', () => {});
});
