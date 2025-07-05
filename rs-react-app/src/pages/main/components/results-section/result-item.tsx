import type { DataItem } from '~types/types';

import { Component } from 'react';

type Props = {
  data: DataItem;
};

export class ResultItem extends Component<Props, unknown> {
  title = this.props.data.title;
  synopsis = this.props.data.synopsis;
  imgUrl = this.props.data.images.webp.image_url;

  render() {
    return (
      <li className="result-item-wrapper">
        <p className="result-item-title">{this.title}</p>
        <div className="overflow-hidden rounded-md">
          <img className="result-item-img" src={this.imgUrl} alt={this.title} />
        </div>
        <p className="result-item-desc">{this.synopsis}</p>
      </li>
    );
  }
}
