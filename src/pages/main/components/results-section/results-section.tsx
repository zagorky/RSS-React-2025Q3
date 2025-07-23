import type { DataItem, PaginationType } from '~types/types';

import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { Loader } from '~components/loader/loader';
import { Pagination } from '~pages/main/components/results-section/pagination';
import { withDataTestId } from '~utils/utilities';
import { Outlet } from 'react-router';

import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

export type ResultSectionProps = {
  results: DataItem[];
  pagination: Pick<
    PaginationType,
    'current_page' | 'has_next_page' | 'last_visible_page'
  >;
  error: string | null;
  loading: boolean;
};

export const ResultsSection = ({
  results,
  error,
  pagination,
  loading,
}: ResultSectionProps) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorFallback error={error} />;
  }

  if (results.length === 0) {
    return <EmptyList />;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <ul {...withDataTestId('result-list')} className="result-section">
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
