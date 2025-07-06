import { retrieveQueryFormLS } from '~utils/utilities';
import { Component } from 'react';

import { ErrorButton } from './components/error-section/error-button';
import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

interface State {
  searchQuery: string;
}

export class MainPage extends Component<unknown, State> {
  state = {
    searchQuery: '',
  };

  componentDidMount() {
    const retrievedQuery = retrieveQueryFormLS() || '';
    this.setState({ searchQuery: retrievedQuery });
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
