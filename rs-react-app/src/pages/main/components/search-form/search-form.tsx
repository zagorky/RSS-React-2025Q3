import { Button } from '~components/button/button';
import {
  retrieveQueryFormLS,
  setQueryToLS,
  withDataTestId,
} from '~utils/utilities';
import { type ChangeEvent, Component, type FormEvent } from 'react';

type Props = {
  onSubmit: (value: string) => void;
};

type State = {
  value: string;
};

export class SearchForm extends Component<Props, State> {
  state: State = {
    value: '',
  };

  componentDidMount() {
    const retrievedQuery = retrieveQueryFormLS();
    this.setState({ value: retrievedQuery });
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
      <form
        {...withDataTestId('search-form')}
        className="search-form"
        onSubmit={this.handleSubmit}
      >
        <label>
          <span className="sr-only">Search</span>
          <input
            {...withDataTestId('search-form-input')}
            className="inpt"
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            placeholder="Search"
          />
        </label>
        <Button {...withDataTestId('search-form-submit-button')} type="submit">
          Search
        </Button>
      </form>
    );
  }
}
