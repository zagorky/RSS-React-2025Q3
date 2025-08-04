import type { ReactNode } from 'react';

import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { Loader } from '~components/loader/loader';
import { getErrorMessageFromUnknown } from '~utils/utilities';
import { useNavigation } from 'react-router';

type QueryBoundaryProps = {
  isLoading?: boolean;
  error?: unknown;
  children: ReactNode;
};

export const QueryBoundary = ({
  isLoading,
  children,
  error,
}: QueryBoundaryProps) => {
  const isVisible = useNavigation().state === 'loading' || isLoading;

  if (error) {
    return <ErrorFallback error={getErrorMessageFromUnknown(error)} />;
  }

  return (
    <>
      {isVisible && <Loader />}
      {children}
    </>
  );
};
