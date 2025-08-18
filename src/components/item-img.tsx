import type { ReactNode } from 'react';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';

type ItemImgProps = {
  url: string;
  alt: string;
  fallback?: ReactNode;
};

export const ItemImg = ({ url, alt, fallback }: ItemImgProps) => {
  return (
    <div className="overflow-hidden rounded-md">
      {url ? (
        <div className={cn('relative aspect-square overflow-hidden rounded-md')}>
          <img alt={alt} src={url} className="object-cover" {...withDataTestId('result-item-img')} />
        </div>
      ) : (
        fallback
      )}
    </div>
  );
};
