import { retrieveQueryFormLS } from '~utils/utilities';
import { Component } from 'react';

import { ErrorButton } from './components/error-section/error-button';
import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

type MainPageState = {
  searchQuery: string;
};

export class MainPage extends Component<unknown, MainPageState> {
  state = {
    searchQuery: retrieveQueryFormLS(),
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSearch} />
        <ResultsSection searchQuery={this.state.searchQuery} />
        <ErrorButton />
      </>
    );
  }
}
