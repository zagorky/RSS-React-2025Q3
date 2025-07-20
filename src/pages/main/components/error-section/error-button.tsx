import { Button } from '~components/button/button';
import { useState } from 'react';

// export class ErrorButton extends Component<unknown, ErrorButtonState> {
//   state = {
//     shouldThrow: false,
//   };
//
//   triggerError = () => {
//     this.setState({ shouldThrow: true });
//   };
//
//   render() {
//     if (this.state.shouldThrow) {
//       throw new Error('~~Test error button clicked!~~');
//     }
//
//     return (
//       <section className="error-section">
//         <Button dataTestId={'throw-error-button'} onClick={this.triggerError}>
//           Throw Error
//         </Button>
//       </section>
//     );
//   }
// }

export const ErrorButton = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  const triggerError = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('~~Test error button clicked!~~');
  }

  return (
    <section className="error-section">
      <Button dataTestId={'throw-error-button'} onClick={triggerError}>
        Throw Error
      </Button>
    </section>
  );
};