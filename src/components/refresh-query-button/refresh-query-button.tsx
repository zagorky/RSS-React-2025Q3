import { queryClient } from '~api/query-client';
import { Button } from '~components/button/button';
import { RefreshCw } from 'lucide-react';

export const RefreshQueryButton = () => {
  return (
    <Button
      variant="secondary"
      classNames="cursor-pointer"
      onClick={() => queryClient.resetQueries()}
      aria-label="refresh api call button"
    >
      <RefreshCw className="h-4.5" />
    </Button>
  );
};
