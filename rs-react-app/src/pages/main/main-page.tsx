import { Component } from 'react';

import { ErrorBoundary } from '../../components/error-boundary';
import { ErrorFallback } from '../../components/error-fallback';
import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

export class MainPage extends Component {
  render() {
    return (
      <main>
        <SearchForm />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ResultsSection />
        </ErrorBoundary>
      </main>
    );
  }
}
