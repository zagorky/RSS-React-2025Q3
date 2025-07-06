import { Button } from '~components/button/button';
import { Component } from 'react';

type State = {
  shouldThrow: boolean;
};

export class ErrorButton extends Component<unknown, State> {
  state = {
    shouldThrow: false,
  };

  triggerError = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('~~Test error button clicked!~~');
    }

    return (
      <section className="error-section">
        <Button dataTestId={'throw-error-button'} onClick={this.triggerError}>
          Throw Error
        </Button>
      </section>
    );
  }
}
