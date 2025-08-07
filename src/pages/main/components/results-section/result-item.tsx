import type { DataItem } from '~types/types';

import { ItemImg } from '~components/item-img/item-img';
import { withDataTestId } from '~utils/utilities';
import { Link, useLocation } from 'react-router';

import { Checkbox } from '~/components/checkbox/checkbox';

type ResultItemProps = {
  data: DataItem;
  isChecked: boolean;
  onCheck: (data: DataItem) => void;
};

export const ResultItem = ({ isChecked, onCheck, data }: ResultItemProps) => {
  const location = useLocation();
  const {
    title,
    synopsis,
    mal_id: id,
    images: {
      webp: { image_url: urlImg },
    },
  } = data;

  return (
    <li className="result-item-wrapper relative">
      <Checkbox
        checked={isChecked}
        onChange={() => onCheck(data)}
        classNames="absolute top-2 left-2"
      />

      <Link className="contents" to={`anime/${id}${location.search}`}>
        <div {...withDataTestId('result-item')}>
          <h4
            {...withDataTestId('result-item-title')}
            className="result-item-title truncate"
          >
            {title}
          </h4>
          <ItemImg url={urlImg} alt={title} />
          <p
            {...withDataTestId('result-item-desc')}
            className="result-item-desc"
          >
            {synopsis}
          </p>
        </div>
      </Link>
    </li>
  );
};
