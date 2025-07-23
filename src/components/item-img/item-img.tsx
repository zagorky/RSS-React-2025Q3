import type { DataItem } from '~types/types';

import { withDataTestId } from '~utils/utilities';

type ItemImgProps = {
  data: DataItem;
};

export const ItemImg = ({ data }: ItemImgProps) => {
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
        <div className="result-item-img"> There is no image :(</div>
      )}
    </div>
  );
};
