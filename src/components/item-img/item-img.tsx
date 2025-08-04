import type { DataItem } from '~types/types';

import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';
import React, { useState } from 'react';

type ItemImgProps = {
  data: DataItem;
  fallback?: React.ReactNode;
};

export const ItemImg = ({ data, fallback }: ItemImgProps) => {
  const title = data.title;
  const imgUrl = data.images.webp.image_url;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-md">
      {imgUrl ? (
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
            src={imgUrl}
            alt={title}
            onLoad={() => setIsImageLoaded(true)}
          />
        </>
      ) : (
        fallback || <div className="result-item-img">There is no image :(</div>
      )}
    </div>
  );
};
