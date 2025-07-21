import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { Loader } from '~components/loader/loader';
import { useFetchResults } from '~pages/main/hooks/useFetchResults';
import { withDataTestId } from '~utils/utilities';

import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

type ResultSectionProps = {
  searchQuery: string;
};

export const ResultsSection = ({ searchQuery }: ResultSectionProps) => {
  const { results, loading, error } = useFetchResults(searchQuery);

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
    <section className="flex items-center justify-center">
      <ul {...withDataTestId('result-list')} className="result-section">
        {results.map((result, i) => (
          <ResultItem key={result.mal_id + 'and' + i} data={result} />
        ))}
      </ul>
    </section>
  );
};
