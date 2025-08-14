import { cn } from '~lib/cn';
import { withDataTestId } from '~lib/utilities';
import Image from 'next/image';
import React from 'react';

type ItemImgProps = {
  url: string;
  alt: string;
  fallback?: React.ReactNode;
};

export const ItemImg = ({ url, alt, fallback }: ItemImgProps) => {
  return (
    <div className="overflow-hidden rounded-md">
      {url ? (
        <div
          className={cn('relative aspect-square overflow-hidden rounded-md')}
        >
          <Image
            className="object-cover"
            {...withDataTestId('result-item-img')}
            src={url}
            alt={alt}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
          />
        </div>
      ) : (
        fallback
      )}
    </div>
  );
};