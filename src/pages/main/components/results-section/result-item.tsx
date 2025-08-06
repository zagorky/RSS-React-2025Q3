import type { DataItem } from '~types/types';

import { ItemImg } from '~components/item-img/item-img';
import { withDataTestId } from '~utils/utilities';
import React from 'react';
import { Link, useLocation } from 'react-router';

import { Checkbox } from '~/components/checkbox/checkbox';

type ResultItemProps = {
  data: DataItem;
  isChecked: boolean;
  onCheck: (data: DataItem, isChecked: boolean) => void;
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

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(data, event.currentTarget.checked);
  };

  return (
    <li className="result-item-wrapper relative">
      <Checkbox
        checked={isChecked}
        onChange={handleCheck}
        classNames="absolute top-2 left-2"
      />

      <Link className="contents" to={`anime/${id}${location.search}`}>
        <div {...withDataTestId('result-item')}>
          <p
            {...withDataTestId('result-item-title')}
            className="result-item-title"
          >
            {title}
          </p>
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