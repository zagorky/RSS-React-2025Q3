import type { DataItem, PaginationType } from '~types/types';

import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { Loader } from '~components/loader/loader';
import { withDataTestId } from '~utils/utilities';
import { NavLink, useLocation } from 'react-router';

import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

export type ResultSectionProps = {
  results: DataItem[];
  pagination: Pick<PaginationType, 'current_page' | 'has_next_page'>;
  error: string | null;
  loading: boolean;
};

export const ResultsSection = ({
  results,
  error,
  pagination,
  loading,
}: ResultSectionProps) => {
  const location = useLocation();

  const getPageLink = (page: number) => {
    const searchParameter = new URLSearchParams(location.search);
    searchParameter.set('page', page.toString());
    return `${location.pathname}?${searchParameter.toString()}`;
  };

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
      <ul {...withDataTestId('result-list')} className="result-section">
        {results.map((result, i) => (
          <ResultItem key={result.mal_id + 'and' + i} data={result} />
        ))}
      </ul>

      <div className="flex justify-center gap-2 text-3xl">
        {pagination.current_page > 1 && (
          <NavLink to={getPageLink(pagination.current_page - 1)}>Prev</NavLink>
        )}
        {pagination.current_page}
        {pagination.has_next_page && (
          <NavLink to={getPageLink(pagination.current_page + 1)}>Next</NavLink>
        )}
      </div>
    </section>
  );
};
