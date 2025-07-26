import type { DataItem } from '~types/types';
import type { PropsWithChildren } from 'react';

import { withDataTestId } from '~utils/utilities';

type ItemImgProps = {
  data: DataItem;
  fallback?: PropsWithChildren;
};

export const ItemImg = ({ data, fallback }: ItemImgProps) => {
  const title = data.title;
  const imgUrl = data.images.webp.image_url;

  return (
    <div className="overflow-hidden rounded-md">
      {imgUrl ? (
        <img
          {...withDataTestId('result-item-img')}
          className="result-item-img"
          src={imgUrl}
          alt={title}
        />
      ) : (
        !fallback && (
          <div className="result-item-img"> There is no image :(</div>
        )
      )}
    </div>
  );
};