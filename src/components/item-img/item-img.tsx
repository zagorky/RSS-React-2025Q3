import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';
import React, { useState } from 'react';

type ItemImgProps = {
  url: string;
  alt: string;
  fallback?: React.ReactNode;
};

export const ItemImg = ({ url, alt, fallback }: ItemImgProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-md">
      {url ? (
        <>
          {!isImageLoaded && (
            <div
              {...withDataTestId('result-item-img-placeholder')}
              className="result-item-img bg-primary-600/60 animate-pulse"
            />
          )}
          <img
            {...withDataTestId('result-item-img')}
            className={cn('result-item-img', {
              hidden: !isImageLoaded,
            })}
            src={url}
            alt={alt}
            onLoad={() => setIsImageLoaded(true)}
          />
        </>
      ) : (
        fallback || <div className="result-item-img">There is no image :(</div>
      )}
    </div>
  );
};
