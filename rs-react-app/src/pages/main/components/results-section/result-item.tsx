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
      <li>
        <div className="result-item-wrapper">
          <div>{this.title}</div>
          <div>{this.synopsis}</div>
        </div>
      </li>
    );
  }
}
