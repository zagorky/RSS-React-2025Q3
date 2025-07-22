import type { DataItem } from '~types/types';

import { navigation } from '~config/navigation';
import { withDataTestId } from '~utils/utilities';
import { Link } from 'react-router';

type ResultItemProps = {
  data: DataItem;
};

export const ResultItem = ({ data }: ResultItemProps) => {
  const title = data.title;
  const synopsis = data.synopsis;
  const imgUrl = data.images.webp.image_url;
  const id = data.title.replace(' ', '_');

  return (
    <li {...withDataTestId('result-item')} className="result-item-wrapper">
      <Link className="contents" to={`${navigation.main}${id}`}>
        <p
          {...withDataTestId('result-item-title')}
          className="result-item-title"
        >
          {title}
        </p>
        <div className="overflow-hidden rounded-md">
          <img
            {...withDataTestId('result-item-img')}
            className="result-item-img"
            src={imgUrl}
            alt={title}
          />
        </div>
        <p {...withDataTestId('result-item-desc')} className="result-item-desc">
          {synopsis}
        </p>
      </Link>
    </li>
  );
};
