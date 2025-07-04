import { Component } from 'react';

import { Button } from '../../../../common-ui/button/button';

export class ErrorSection extends Component {
  render() {
    return (
      <Button
        onClick={() => {
          throw new Error('~~Test error button clicked!~~');
        }}
      >
        Throw Error
      </Button>
    );
  }
}
