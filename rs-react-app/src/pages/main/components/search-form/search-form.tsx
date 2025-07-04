import { Component, type FormEvent } from 'react';

export class SearchForm extends Component {
  handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label htmlFor="search-input">
          Search
          <input id="search-input" type="text" placeholder="Search" />
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}
