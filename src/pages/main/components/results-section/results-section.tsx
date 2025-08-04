import type { LoaderDataType } from '~types/loader-types';
import type { DataItem } from '~types/types';

import { QueryBoundary } from '~components/query-boundary/query-boundary';
import { Pagination } from '~pages/main/components/results-section/pagination';
import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';
import { Outlet, useOutlet, useRouteLoaderData } from 'react-router';

import {
  useSelectedCards,
  useStoreActions,
} from '~/store/selected-cards-store';

import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

export const ResultsSection = () => {
  const outlet = useOutlet();
  const data = useRouteLoaderData<LoaderDataType>('main-page');
  const { addCard, removeCard } = useStoreActions();
  const selectedCards = useSelectedCards();

  const handleCheck = (data: DataItem, isChecked: boolean) => {
    if (isChecked) {
      addCard(data);
    } else {
      removeCard(data);
    }
  };

  const isItemChecked = (id: number) =>
    selectedCards.some((card) => card.mal_id === id);

  if (!data) {
    return <EmptyList />;
  }

  const { results, pagination } = data;

  if (results.length === 0) {
    return <EmptyList />;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <QueryBoundary>
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
              <ResultItem
                onCheck={handleCheck}
                isChecked={isItemChecked(result.mal_id)}
                key={result.mal_id + 'and' + i}
                data={result}
              />
            ))}
          </ul>
          <Outlet />
        </div>
        <Pagination pagination={pagination} />
      </QueryBoundary>
    </section>
  );
};
