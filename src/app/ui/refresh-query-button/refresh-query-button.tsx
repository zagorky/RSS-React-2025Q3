'use client';
import { useRouter } from '~i18n/navigation';
import { Button } from '~ui/button/button';
import { RefreshCw } from 'lucide-react';

export const RefreshQueryButton = () => {
  const { refresh } = useRouter();
  return (
    <Button
      variant="secondary"
      classNames="cursor-pointer"
      onClick={refresh}
      aria-label="refresh api call button"
    >
      <RefreshCw className="h-4.5" />
    </Button>
  );
};