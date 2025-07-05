import { retrieveQueryFormLS, setQueryToLS } from '~utils/utilities';
import { type ChangeEvent, Component, type FormEvent } from 'react';

import { Button } from '~/components/common-ui/button/button';

type Props = {
  onSubmit: (value: string) => void;
};

type State = {
  value: string;
};

export class SearchForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const retrievedQuery = retrieveQueryFormLS();
    this.state = { value: retrievedQuery };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    setQueryToLS(this.state.value);
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <label htmlFor="search-input">
          <span>Search</span>
          <input
            className="inpt"
            value={this.state.value}
            onChange={this.handleChange}
            id="search-input"
            type="text"
            placeholder="Search"
          />
        </label>
        <Button type="submit">Search</Button>
      </form>
    );
  }
}
