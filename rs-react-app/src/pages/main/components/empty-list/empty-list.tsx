import { Component } from 'react';

export class EmptyList extends Component {
  render() {
    return (
      <div className="basic-content-wrapper">
        <h2>No matching</h2>
        <p>Try another search query</p>
      </div>
    );
  }
}
