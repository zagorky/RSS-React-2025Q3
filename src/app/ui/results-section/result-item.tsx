'use client';

import type {DataItem} from '~types/types';

import {withDataTestId} from '~lib/utilities';
import {useSelectedCardsStore, useStoreActions,} from '~store/selected-cards-store';
import {Checkbox} from '~ui/checkbox/checkbox';
import {ItemImg} from '~ui/item-img/item-img';

type ResultItemProps = {
  data: DataItem;
};

export const ResultItem = ({ data }: ResultItemProps) => {
  const {
    title,
    synopsis,
    mal_id: id,
    images: {
      webp: { image_url: urlImg },
    },
  } = data;

  const { toggleSelectedCard } = useStoreActions();

  const isChecked = useSelectedCardsStore((state) =>
    state.selectedCards.some((card) => card.mal_id === id)
  );

  return (
    <li className="result-item-wrapper relative">
      <Checkbox
        checked={isChecked}
        onChange={() => toggleSelectedCard(data)}
        classNames="absolute top-2 left-2"
      />

      {/*<Link className="contents" href={`anime/${id}${searchParams.toString()}`}>*/}
      <div {...withDataTestId('result-item')}>
        <h4
          {...withDataTestId('result-item-title')}
          className="result-item-title truncate"
        >
          {title}
        </h4>
        <ItemImg url={urlImg} alt={title} />
        <p {...withDataTestId('result-item-desc')} className="result-item-desc">
          {synopsis}
        </p>
      </div>
      {/*</Link>*/}
    </li>
  );
};