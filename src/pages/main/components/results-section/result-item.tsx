import type { DataItem } from '~types/types';

import { ItemImg } from '~components/item-img/item-img';
import { withDataTestId } from '~utils/utilities';
import { Link, useLocation } from 'react-router';

type ResultItemProps = {
  data: DataItem;
};

export const ResultItem = ({ data }: ResultItemProps) => {
  const title = data.title;
  const synopsis = data.synopsis;
  const id = data.mal_id;
  const location = useLocation();

  return (
    <Link className="contents" to={`${id}${location.search}`}>
      <li {...withDataTestId('result-item')} className="result-item-wrapper">
        <p
          {...withDataTestId('result-item-title')}
          className="result-item-title"
        >
          {title}
        </p>
        <ItemImg data={data} />
        <p {...withDataTestId('result-item-desc')} className="result-item-desc">
          {synopsis}
        </p>
      </li>
    </Link>
  );
};