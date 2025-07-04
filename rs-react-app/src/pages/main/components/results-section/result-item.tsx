import { Component } from 'react';

import type { DataItem } from '../../../../types/types';

type Props = {
  data: DataItem;
};

export class ResultItem extends Component<Props, unknown> {
  title = this.props.data.title;
  synopsis = this.props.data.synopsis;

  render() {
    return (
      <li className="contents">
        <div className="result-item-wrapper">
          <p className="result-item-title">{this.title}</p>
          <p className="result-item-decs">{this.synopsis}</p>
        </div>
      </li>
    );
  }
}
