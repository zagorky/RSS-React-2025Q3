import { ErrorFallback } from '~components/error-fallback';
import { Loader } from '~components/loader';
import { Table } from '~components/table';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const App = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loader />}>
          <Table />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;