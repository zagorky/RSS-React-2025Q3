import type { ReactNode } from 'react';

import { Component } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className="main-wrapper">
        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}
