import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (error: Error) => ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('~~~Rendering Error~~~', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}
