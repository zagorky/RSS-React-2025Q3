import {
  captureOwnerStack,
  Component,
  type ErrorInfo,
  type ReactNode,
} from 'react';

type Props = {
  children: ReactNode;
  fallback: (error: Error) => ReactNode;
};

type State = {
  error: Error | null;
};
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      '~~~Rendering Error~~~~',
      error,
      info.componentStack,
      captureOwnerStack()
    );
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}
