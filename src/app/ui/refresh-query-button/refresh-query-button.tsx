'use client';
import { invalidateCacheByTag } from '~lib/actions';
import { Button } from '~ui/button/button';
import { RefreshCw } from 'lucide-react';
import { useTransition } from 'react';

export const RefreshQueryButton = ({
  tag = 'detail-page',
}: {
  tag?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleRevalidate = () => {
    startTransition(async () => {
      await invalidateCacheByTag(tag);
    });
  };
  return (
    <Button
      variant="secondary"
      classNames="cursor-pointer"
      onClick={handleRevalidate}
      disabled={isPending}
      aria-label="refresh api call button"
    >
      <RefreshCw className="h-4.5" />
    </Button>
  );
};