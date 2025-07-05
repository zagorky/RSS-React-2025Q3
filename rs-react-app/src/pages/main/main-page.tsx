import { retrieveQueryFormLS } from '~utils/utilities';
import { Component } from 'react';

import { ErrorBoundary } from '~/components/error-boundary';
import { ErrorFallback } from '~/components/error-fallback';

import { ErrorButton } from './components/error-section/error-button';
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

  handleErrorFallback = (error: Error) => {
    return <ErrorFallback error={error} />;
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={(query) => this.handleSearch(query)} />
        <ErrorBoundary fallback={this.handleErrorFallback}>
          <ResultsSection searchQuery={this.state.searchQuery} />
          <ErrorButton />
        </ErrorBoundary>
      </>
    );
  }
}
