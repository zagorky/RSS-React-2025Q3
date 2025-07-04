import { Component } from 'react';

import { ErrorBoundary } from '../../components/error-boundary';
import { ErrorFallback } from '../../components/error-fallback';
import { retrieveQueryFormLS } from '../../utils/utilities';
import { ErrorSection } from './components/error-section/error-section';
import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

interface State {
  searchQuery: string;
}

export class MainPage extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    const savedQuery = retrieveQueryFormLS();
    this.state = { searchQuery: savedQuery };
  }

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <main>
        <SearchForm onSubmit={(query) => this.handleSearch(query)} />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ResultsSection searchQuery={this.state.searchQuery} />
        </ErrorBoundary>
        <ErrorSection />
      </main>
    );
  }
}
