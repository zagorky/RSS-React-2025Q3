'use client';
import { Button } from '~ui/button/button';
import { RefreshCw } from 'lucide-react';

export const RefreshQueryButton = () => {
  return (
    <Button
      variant="secondary"
      classNames="cursor-pointer"
      onClick={() => {}}
      aria-label="refresh api call button"
    >
      <RefreshCw className="h-4.5" />
    </Button>
  );
};
