import type { FallbackProps } from 'react-error-boundary';

import { Button } from '~components/button';
import { getErrorMessageFromUnknown, withDataTestId } from '~utils/utilities';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <section
    {...withDataTestId('error-fallback')}
    id="error-fallback"
    className="basic-content-wrapper flex flex-col items-center justify-center text-center"
  >
    <div className="max-w-md rounded-xl p-8">
      <div className="mb-6 flex justify-center">
        <div className="bg-error/10 text-error flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold">
          !
        </div>
      </div>

      <h2 className="text-text-primary mb-3 text-2xl font-bold">Oops! Something went wrong</h2>

      <div className="mb-6 rounded-lg p-4">
        <p className="text-text-secondary text-lg">{getErrorMessageFromUnknown(error)}</p>
      </div>

      <Button dataTestId="error-fallback-button" onClick={resetErrorBoundary}>
        Refresh
      </Button>
    </div>
  </section>
);