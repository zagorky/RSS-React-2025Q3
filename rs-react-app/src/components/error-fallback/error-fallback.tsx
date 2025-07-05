import { Button } from '~components/button/button';
import { Component } from 'react';

type Props = {
  error: Error | string;
};

export class ErrorFallback extends Component<Props> {
  render() {
    return (
      <section id="error-fallback" className="basic-content-wrapper">
        <h2 className="text-2xl font-bold text-[var(--color-error)]">
          Try Again
        </h2>
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
