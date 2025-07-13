import { Button } from '~components/button/button';
import { isString } from '~types/type-guards';
import { withDataTestId } from '~utils/utilities';
import { Component, type FormEvent } from 'react';

type SearchFormProps = {
  onSubmit: (value: string) => void;
  searchQuery: string;
};

export class SearchForm extends Component<SearchFormProps> {
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputFormData = new FormData(event.currentTarget);
    const formValue = inputFormData.get('search-input');
    if (isString(formValue)) {
      this.props.onSubmit(formValue);
    }
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
            name="search-input"
            defaultValue={this.props.searchQuery}
            className="inpt"
            type="text"
            placeholder="Search"
          />
        </label>
        <Button type="submit">Search</Button>
      </form>
    );
  }
}
