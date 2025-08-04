import type { ReactNode } from 'react';

import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { Loader } from '~components/loader/loader';
import { getErrorMessageFromUnknown } from '~utils/utilities';

type QueryBoundaryProps = {
  isLoading: boolean;
  error: unknown;
  children: ReactNode;
};

export const QueryBoundary = ({
  isLoading,
  children,
  error,
}: QueryBoundaryProps) => {
  if (isLoading) {
    return <Loader isLoading={true} />;
  }
  if (error) {
    return <ErrorFallback error={getErrorMessageFromUnknown(error)} />;
  }

  return children;
};