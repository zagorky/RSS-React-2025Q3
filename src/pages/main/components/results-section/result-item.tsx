import type { DataItem } from '~types/types';

import { ItemImg } from '~components/item-img/item-img';
import { withDataTestId } from '~utils/utilities';
import { Link, useLocation } from 'react-router';

import { Checkbox } from '~/components/checkbox/checkbox';

type ResultItemProps = {
  data: DataItem;
};

export const ResultItem = ({ data }: ResultItemProps) => {
  const title = data.title;
  const synopsis = data.synopsis;
  const id = data.mal_id;
  const location = useLocation();

  return (
    <li className="result-item-wrapper relative">
      <Checkbox classNames="absolute top-2 left-2" />

      <Link className="contents" to={`anime/${id}${location.search}`}>
        <div {...withDataTestId('result-item')}>
          <p
            {...withDataTestId('result-item-title')}
            className="result-item-title"
          >
            {title}
          </p>
          <ItemImg data={data} />
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
