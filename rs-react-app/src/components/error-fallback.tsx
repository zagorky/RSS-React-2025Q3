import { Component } from 'react';

import { Button } from '../common-ui/button/button';

type Props = {
  error: Error | string;
};

export class ErrorFallback extends Component<Props> {
  render() {
    return (
      <section className="m-auto flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Try Again</h2>
        <p>
          {this.props.error instanceof Error
            ? this.props.error.message
            : this.props.error}
        </p>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </section>
    );
  }
}
