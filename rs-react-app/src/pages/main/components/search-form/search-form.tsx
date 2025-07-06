import { Button } from '~components/button/button';
import { withDataTestId } from '~utils/utilities';
import { type ChangeEvent, Component, type FormEvent } from 'react';

type Props = {
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
  value: string;
};

export class SearchForm extends Component<Props> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.onSubmit(this.props.value);
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
            value={this.props.value}
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
