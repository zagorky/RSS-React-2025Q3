import type { DataItem } from '~types/types';

import { withDataTestId } from '~utils/utilities';
import { Component } from 'react';

type ResultItemProps = {
  data: DataItem;
};

export class ResultItem extends Component<ResultItemProps, unknown> {
  title = this.props.data.title;
  synopsis = this.props.data.synopsis;
  imgUrl = this.props.data.images.webp.image_url;

  render() {
    return (
      <li {...withDataTestId('result-item')} className="result-item-wrapper">
        <p
          {...withDataTestId('result-item-title')}
          className="result-item-title"
        >
          {this.title}
        </p>
        <div className="overflow-hidden rounded-md">
          <img
            {...withDataTestId('result-item-img')}
            className="result-item-img"
            src={this.imgUrl}
            alt={this.title}
          />
        </div>
        <p {...withDataTestId('result-item-desc')} className="result-item-desc">
          {this.synopsis}
        </p>
      </li>
    );
  }
}
