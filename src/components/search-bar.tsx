import { Input } from '~components/input';
import { useTableHandlers } from '~hooks/use-table-handlers';

import { useSearch } from '~/store/app-store';

export const SearchBar = () => {
  const search = useSearch();
  const { handleSearchChange } = useTableHandlers();

  return <Input variant="default" placeholder="Search country" value={search} onChange={handleSearchChange} />;
};