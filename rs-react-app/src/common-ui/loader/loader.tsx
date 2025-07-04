import { Component } from 'react';

export class Loader extends Component {
  render() {
    return (
      <div className="loader-overlay">
        <div className="loader-container">
          <div className="loader-spinner"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    );
  }
}
