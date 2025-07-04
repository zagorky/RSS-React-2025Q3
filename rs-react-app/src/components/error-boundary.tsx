import {
  captureOwnerStack,
  Component,
  type ErrorInfo,
  type ReactNode,
} from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      'Rendering Error',
      error,
      info.componentStack,
      captureOwnerStack()
    );
  }

  render() {
    if (this.state.hasError) {
      return <p>Try again</p>;
    }

    return this.props.children;
  }
}
