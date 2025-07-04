import { Component } from 'react';

import { ResultsSection } from './components/results-section/results-section';
import { SearchForm } from './components/search-form/search-form';

export class MainPage extends Component {
  render() {
    return (
      <main>
        <SearchForm />
        <ResultsSection />
      </main>
    );
  }
}
