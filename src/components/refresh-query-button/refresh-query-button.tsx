import { useQueryClient } from '@tanstack/react-query';
import { Button } from '~components/button/button';
import { RefreshCw } from 'lucide-react';

export const RefreshQueryButton = () => {
  const queryClient = useQueryClient();
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
