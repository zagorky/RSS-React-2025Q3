import { Component } from 'react';

import { MainPage } from '../../pages/main/main-page';

export class Layout extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <main className="main">
          <MainPage />
        </main>
      </div>
    );
  }
}
