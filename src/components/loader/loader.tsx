import { withDataTestId } from '~utils/utilities';
import { Component } from 'react';

export class Loader extends Component {
  render() {
    return (
      <div className="loader-overlay">
        <div {...withDataTestId('loader')} className="loader-container">
          <div className="loader-spinner"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    );
  }
}
