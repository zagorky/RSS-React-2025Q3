'use client';

import type { DataItem } from '~types/types';

import { assertIsNonNullable, withDataTestId } from '~lib/utilities';
import { Checkbox } from '~ui/checkbox/checkbox';
import { ItemImg } from '~ui/item-img/item-img';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { memo } from 'react';

type ResultItemProps = {
  data: DataItem;
  isChecked?: boolean;
  onCheck?: (data: DataItem) => void;
};

export const ResultItem = memo(({ isChecked, data }: ResultItemProps) => {
  const {
    title,
    synopsis,
    mal_id: id,
    images: {
      webp: { image_url: urlImg },
    },
  } = data;

  const searchParams = useSearchParams();
  assertIsNonNullable(searchParams);

  return (
    <li className="result-item-wrapper relative">
      <Checkbox
        checked={isChecked}
        // onChange={() => onCheck(data)}
        classNames="absolute top-2 left-2"
      />

      <Link className="contents" href={`anime/${id}${searchParams.toString()}`}>
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
});

ResultItem.displayName = 'ResultItem';
