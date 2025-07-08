import { withDataTestId } from '~utils/utilities';
import { Component } from 'react';

export class EmptyList extends Component {
  render() {
    return (
      <div {...withDataTestId('empty-list')} className="basic-content-wrapper">
        <h2>No matching</h2>
        <p>Try another search query</p>
      </div>
    );
  }
}
