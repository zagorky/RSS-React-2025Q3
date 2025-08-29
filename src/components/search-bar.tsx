import { Input } from '~components/input';

import { useSearch, useTableStoreActions } from '~/store/app-store';

export const SearchBar = () => {
  const search = useSearch();
  const { setSearch } = useTableStoreActions();

  return (
    <Input
      variant="default"
      placeholder="Search country"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
};