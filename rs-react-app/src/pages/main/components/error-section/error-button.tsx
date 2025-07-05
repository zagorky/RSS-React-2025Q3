import { Component } from 'react';

import { Button } from '~/components/common-ui/button/button';

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

    return <Button onClick={this.triggerError}>Throw Error</Button>;
  }
}
