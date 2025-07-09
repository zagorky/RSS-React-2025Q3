import { Button } from '~components/button/button';
import { withDataTestId } from '~utils/utilities';
import { Component } from 'react';

type ErrorFallbackProps = {
  error: Error | string;
};

export class ErrorFallback extends Component<ErrorFallbackProps> {
  render() {
    return (
      <section
        {...withDataTestId('error-fallback')}
        id="error-fallback"
        className="basic-content-wrapper"
      >
        <h2 className="h2 text-[var(--color-error)]">Try Again</h2>
        <p>
          {this.props.error instanceof Error
            ? this.props.error.message
            : this.props.error}
        </p>
        <Button
          dataTestId={'error-fallback-button'}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </section>
    );
  }
}
