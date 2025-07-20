import { Button } from '~components/button/button';
import { isString } from '~types/type-guards';
import { withDataTestId } from '~utils/utilities';
import { type FormEvent } from 'react';

type SearchFormProps = {
  onSubmit: (value: string) => void;
  searchQuery: string;
};

export const SearchForm = ({ onSubmit, searchQuery }: SearchFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputFormData = new FormData(event.currentTarget);
    const formValue = inputFormData.get('search-input');
    if (isString(formValue)) {
      onSubmit(formValue);
    }
  };
  return (
    <form
      {...withDataTestId('search-form')}
      className="search-form"
      onSubmit={handleSubmit}
    >
      <label>
        <span className="sr-only">Search</span>
        <input
          {...withDataTestId('search-form-input')}
          name="search-input"
          defaultValue={searchQuery}
          className="inpt"
          type="text"
          placeholder="Search"
        />
      </label>
      <Button type="submit">Search</Button>
    </form>
  );
};
