import type { LoaderDataType } from '~types/loader-types';

import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { Loader } from '~components/loader/loader';
import { Pagination } from '~pages/main/components/results-section/pagination';
import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';
import { Outlet, useOutlet } from 'react-router';

import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

export type ResultSectionProps = Omit<LoaderDataType, 'query'>;

export const ResultsSection = ({
  results,
  error,
  pagination,
}: ResultSectionProps) => {
  const outlet = useOutlet();

  if (error) {
    return <ErrorFallback error={error} />;
  }

  if (results.length === 0) {
    return <EmptyList />;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <Loader />
      <div className="flex justify-center gap-4 p-4">
        <ul
          {...withDataTestId('result-list')}
          className={cn(
            'grid w-full gap-6 transition-all duration-300 ease-in-out',
            outlet
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {results.map((result, i) => (
            <ResultItem key={result.mal_id + 'and' + i} data={result} />
          ))}
        </ul>
        <Outlet />
      </div>
      <Pagination pagination={pagination} />
    </section>
  );
};