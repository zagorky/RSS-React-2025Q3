import type { DataItem } from '~types/types';

import { withDataTestId } from '~utils/utilities';
import { Component } from 'react';

type ResultItemProps = {
  data: DataItem;
};

export class ResultItem extends Component<ResultItemProps> {
  render() {
    const title = this.props.data.title;
    const synopsis = this.props.data.synopsis;
    const imgUrl = this.props.data.images.webp.image_url;

    return (
      <li {...withDataTestId('result-item')} className="result-item-wrapper">
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
      </li>
    );
  }
}
