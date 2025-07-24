import { Button } from '~components/button/button';
import { withDataTestId } from '~utils/utilities';

type ErrorFallbackProps = {
  error: Error | string;
};

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <section
      {...withDataTestId('error-fallback')}
      id="error-fallback"
      className="basic-content-wrapper"
    >
      <h2 className="h2 text-error">Try Again</h2>
      <p className="text-xl">Something went wrong</p>
      <p className="text-lg">
        {error instanceof Error ? error.message : error}
      </p>
      <Button
        dataTestId={'error-fallback-button'}
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </section>
  );
};
