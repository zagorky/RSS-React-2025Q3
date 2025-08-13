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
        <Image
          {...withDataTestId('result-item-img')}
          className={cn('result-item-img')}
          width={225}
          height={350}
          src={url}
          alt={alt}
        />
      ) : (
        fallback || <div className="result-item-img">There is no image :(</div>
      )}
    </div>
  );
};
