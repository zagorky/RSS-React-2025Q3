import type { DataItem } from '~types/types';

import { ItemImg } from '~components/item-img/item-img';
import { withDataTestId } from '~utils/utilities';
import React from 'react';
import { Link, useLocation } from 'react-router';

import { Checkbox } from '~/components/checkbox/checkbox';
import { useStore } from '~/store/store';

type ResultItemProps = {
  data: DataItem;
};

export const ResultItem = ({ data }: ResultItemProps) => {
  const { addCard, removeCard, selectedCards } = useStore();
  const location = useLocation();
  const { title, synopsis, mal_id: id } = data;

  const isChecked = selectedCards.some((card) => card.mal_id === id);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      addCard(data);
    } else {
      removeCard(data);
    }
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