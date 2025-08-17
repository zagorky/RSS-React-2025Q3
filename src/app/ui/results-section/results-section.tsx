import { fetchAnimeData } from '~lib/api';
import { cn } from '~lib/cn';
import { withDataTestId } from '~lib/utilities';
import { EmptyList } from '~ui/empty-list/empty-list';
import { Pagination } from '~ui/pagination/pagination';

import { ResultItem } from './result-item';

type ResultsSectionProps = {
  query: string;
  page: number;
};

export const ResultsSection = async ({ query, page }: ResultsSectionProps) => {
  const { data: results, pagination } = await fetchAnimeData({ query, page });

  if (results.length === 0) {
    return <EmptyList />;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex justify-center gap-4 p-4">
        <ul
          {...withDataTestId('result-list')}
          className={cn(
            'grid w-full justify-items-center gap-6 transition-all duration-300 ease-in-out',
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
          )}
        >
          {results.map((result, i) => (
            <ResultItem key={result.mal_id + 'and' + i} data={result} />
          ))}
        </ul>
      </div>
      <Pagination pagination={pagination} />
    </section>
  );
};