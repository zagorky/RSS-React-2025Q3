import { retrieveQueryFormLS } from '~utils/utilities';
import { Component } from 'react';

import { ErrorButton } from './components/error-section/error-button';
import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

interface State {
  searchQuery: string;
}

export class MainPage extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    const retrievedQuery = retrieveQueryFormLS();
    this.state = { searchQuery: retrievedQuery };
  }

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={(query) => this.handleSearch(query)} />
        <ResultsSection searchQuery={this.state.searchQuery} />
        <ErrorButton />
      </>
    );
  }
}
