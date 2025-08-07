import { Loader } from '~components/loader/loader';
import { useMainPageQuery } from '~hooks/useMainPageQuery';
import { Pagination } from '~pages/main/components/results-section/pagination';
import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';
import { Outlet, useOutlet } from 'react-router';

import {
  useSelectedCards,
  useStoreActions,
} from '~/store/selected-cards-store';

import { EmptyList } from '../empty-list/empty-list';
import { ResultItem } from './result-item';

export const ResultsSection = () => {
  const outlet = useOutlet();
  const { results, pagination } = useMainPageQuery();
  const { toggleSelectedCard } = useStoreActions();
  const selectedCards = useSelectedCards();

  const isItemChecked = (id: number) =>
    selectedCards.some((card) => card.mal_id === id);

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
            'grid w-full justify-items-center gap-6 transition-all duration-300 ease-in-out',
            outlet
              ? 'hidden grid-cols-1 sm:grid lg:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {results.map((result, i) => (
            <ResultItem
              isChecked={isItemChecked(result.mal_id)}
              onCheck={toggleSelectedCard}
              key={result.mal_id + 'and' + i}
              data={result}
            />
          ))}
        </ul>
        <div
          className={cn(
            'justify-items-center overflow-hidden transition-all duration-300',
            outlet ? 'w-[500px] opacity-100' : 'w-0 opacity-0'
          )}
        >
          <Outlet />
        </div>
      </div>
      <Pagination pagination={pagination} />
    </section>
  );
};