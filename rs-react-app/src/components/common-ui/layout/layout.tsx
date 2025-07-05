import { MainPage } from '~pages/main/main-page';
import { Component } from 'react';

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
